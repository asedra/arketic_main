#!/bin/bash

# Arketic Task Commit Script
# Purpose: Safely commit completed task work with comprehensive error handling
# Handles Git maximum byte limits and uses GitHub token from .env

set -euo pipefail  # Exit on error, undefined vars, pipe failures

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
MAX_COMMIT_SIZE_MB=50  # GitHub's practical limit before issues
MAX_FILE_SIZE_MB=25    # Individual file size limit
CHUNK_SIZE_KB=512      # Size for chunked operations
AUTO_MODE=true         # Automatic mode - no user confirmations

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if .env file exists and load GITHUB_TOKEN
load_env() {
    local env_file=".env"
    
    if [[ ! -f "$env_file" ]]; then
        print_error ".env file not found. Please create one with GITHUB_TOKEN."
        print_status "You can copy from .env.example: cp .env.example .env"
        exit 1
    fi
    
    # Source .env file safely
    if ! source "$env_file" 2>/dev/null; then
        print_error "Failed to load .env file. Check syntax."
        exit 1
    fi
    
    if [[ -z "${GITHUB_TOKEN:-}" ]]; then
        print_error "GITHUB_TOKEN not found in .env file."
        print_status "Please add: GITHUB_TOKEN=your_token_here"
        exit 1
    fi
    
    # Validate token format (basic check)
    if [[ ! "$GITHUB_TOKEN" =~ ^(ghp_|github_pat_) ]]; then
        print_warning "GITHUB_TOKEN format may be invalid. Expected to start with 'ghp_' or 'github_pat_'"
    fi
    
    print_success "GitHub token loaded from .env"
}

# Function to check git repository status
check_git_status() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "Not a git repository. Initialize with: git init"
        exit 1
    fi
    
    if ! git remote get-url origin > /dev/null 2>&1; then
        print_error "No remote 'origin' configured."
        print_status "Add remote with: git remote add origin <url>"
        exit 1
    fi
    
    print_success "Git repository validated"
}

# Function to check file sizes and prepare batches
check_file_sizes() {
    local total_size=0
    local large_files=()
    
    print_status "Checking file sizes..."
    
    # Check staged files
    while IFS= read -r -d '' file; do
        if [[ -f "$file" ]]; then
            local size_bytes
            size_bytes=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo 0)
            local size_mb=$((size_bytes / 1024 / 1024))
            
            total_size=$((total_size + size_bytes))
            
            if (( size_mb > MAX_FILE_SIZE_MB )); then
                large_files+=("$file (${size_mb}MB)")
            fi
        fi
    done < <(git diff --cached --name-only -z)
    
    # Check total commit size
    local total_size_mb=$((total_size / 1024 / 1024))
    
    if (( total_size_mb > MAX_COMMIT_SIZE_MB )); then
        print_warning "Commit size too large: ${total_size_mb}MB (max: ${MAX_COMMIT_SIZE_MB}MB)"
        print_status "Will automatically split into smaller batches."
        return 2  # Special return code for batching
    fi
    
    if (( ${#large_files[@]} > 0 )); then
        print_warning "Large files detected:"
        printf '%s\n' "${large_files[@]}"
        print_status "Consider using Git LFS for large files."
        if [[ "$AUTO_MODE" == "true" ]]; then
            print_status "Auto-mode: Continuing with large files..."
        else
            read -p "Continue anyway? (y/N): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                print_status "Commit cancelled by user."
                exit 0
            fi
        fi
    fi
    
    print_success "File sizes validated (${total_size_mb}MB total)"
    return 0
}

# Function to create file batches based on size
create_batches() {
    local batch_files=()
    local current_batch_size=0
    local batch_number=1
    local temp_batch_file="/tmp/commit_batch_$$"
    
    print_status "Creating commit batches..."
    
    # Reset staging area
    git reset > /dev/null 2>&1
    
    # Get all files that should be committed
    local all_files=()
    while IFS= read -r -d '' file; do
        # Skip sensitive files and very large files
        if [[ "$file" =~ \.(env|key|pem|p12|jks)$ ]] || 
           [[ "$file" =~ /(\.env|\.env\.|credentials|secrets)/ ]]; then
            continue
        fi
        
        if [[ -f "$file" ]]; then
            local size_bytes
            size_bytes=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo 0)
            local size_mb=$((size_bytes / 1024 / 1024))
            
            if (( size_mb > MAX_FILE_SIZE_MB )); then
                print_warning "Skipping oversized file: $file (${size_mb}MB)"
                continue
            fi
            
            all_files+=("$file:$size_bytes")
        fi
    done < <(git ls-files --modified --others --exclude-standard -z)
    
    # Sort files by size (smallest first for better batching)
    IFS=$'\n' all_files=($(sort -t: -k2 -n <<< "${all_files[*]}"))
    
    # Create batches
    for file_info in "${all_files[@]}"; do
        local file="${file_info%:*}"
        local size_bytes="${file_info##*:}"
        local size_mb=$((size_bytes / 1024 / 1024))
        
        # Check if adding this file would exceed batch size
        local new_batch_size=$((current_batch_size + size_bytes))
        local new_batch_size_mb=$((new_batch_size / 1024 / 1024))
        
        if (( new_batch_size_mb > MAX_COMMIT_SIZE_MB && ${#batch_files[@]} > 0 )); then
            # Save current batch
            printf '%s\n' "${batch_files[@]}" > "${temp_batch_file}_${batch_number}"
            print_status "Batch $batch_number: ${#batch_files[@]} files (~$((current_batch_size / 1024 / 1024))MB)"
            
            # Start new batch
            batch_number=$((batch_number + 1))
            batch_files=("$file")
            current_batch_size=$size_bytes
        else
            # Add to current batch
            batch_files+=("$file")
            current_batch_size=$new_batch_size
        fi
    done
    
    # Save final batch if not empty
    if (( ${#batch_files[@]} > 0 )); then
        printf '%s\n' "${batch_files[@]}" > "${temp_batch_file}_${batch_number}"
        print_status "Batch $batch_number: ${#batch_files[@]} files (~$((current_batch_size / 1024 / 1024))MB)"
    fi
    
    echo "$batch_number"  # Return number of batches
}

# Function to commit batches sequentially
commit_batches() {
    local num_batches="$1"
    local commit_message_base="$2"
    local temp_batch_file="/tmp/commit_batch_$$"
    local successful_batches=0
    
    print_status "Committing $num_batches batches..."
    
    for ((i=1; i<=num_batches; i++)); do
        local batch_file="${temp_batch_file}_${i}"
        
        if [[ ! -f "$batch_file" ]]; then
            print_warning "Batch file $i not found, skipping..."
            continue
        fi
        
        print_status "Processing batch $i of $num_batches..."
        
        # Stage files for this batch
        git reset > /dev/null 2>&1  # Clear staging area
        
        local batch_size=0
        local files_count=0
        while IFS= read -r file; do
            if [[ -f "$file" ]]; then
                git add "$file"
                files_count=$((files_count + 1))
                
                local size_bytes
                size_bytes=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo 0)
                batch_size=$((batch_size + size_bytes))
            fi
        done < "$batch_file"
        
        local batch_size_mb=$((batch_size / 1024 / 1024))
        
        # Create batch-specific commit message
        local batch_commit_message
        if (( num_batches > 1 )); then
            batch_commit_message="${commit_message_base} (part $i/$num_batches)

Batch size: ${batch_size_mb}MB, Files: $files_count"
        else
            batch_commit_message="$commit_message_base"
        fi
        
        # Commit this batch
        if safe_commit "$batch_commit_message"; then
            successful_batches=$((successful_batches + 1))
            print_success "Batch $i committed successfully"
        else
            print_error "Failed to commit batch $i"
            # Clean up temp files
            rm -f "${temp_batch_file}_"*
            return 1
        fi
        
        # Clean up this batch file
        rm -f "$batch_file"
    done
    
    print_success "All $successful_batches batches committed successfully!"
    return 0
}

# Function to generate smart commit message
generate_commit_message() {
    local task_key=""
    local files_changed=""
    local change_summary=""
    
    # Extract task key from branch name or recent commits
    local branch_name
    branch_name=$(git branch --show-current 2>/dev/null || echo "")
    
    if [[ "$branch_name" =~ (AR-[0-9]+-T[0-9]+) ]]; then
        task_key="${BASH_REMATCH[1]}"
    fi
    
    # Get changed files summary
    local staged_files
    staged_files=$(git diff --cached --name-only | head -10)
    local file_count
    file_count=$(echo "$staged_files" | wc -l | tr -d ' ')
    
    if (( file_count > 5 )); then
        files_changed="Multiple files ($file_count changed)"
    else
        files_changed=$(echo "$staged_files" | tr '\n' ', ' | sed 's/,$//')
    fi
    
    # Generate appropriate commit message
    local base_message
    if [[ -n "$task_key" ]]; then
        base_message="[$task_key] Task implementation completed"
    else
        base_message="Task implementation completed"
    fi
    
    # Add file context if meaningful
    if [[ -n "$files_changed" ]]; then
        base_message="$base_message

Files modified: $files_changed"
    fi
    
    echo "$base_message"
}

# Function to perform safe commit with retries
safe_commit() {
    local commit_message="$1"
    local max_retries=3
    local retry_count=0
    
    while (( retry_count < max_retries )); do
        print_status "Attempting commit (attempt $((retry_count + 1))/$max_retries)..."
        
        if git commit -m "$commit_message" 2>/dev/null; then
            print_success "Commit successful"
            return 0
        else
            retry_count=$((retry_count + 1))
            if (( retry_count < max_retries )); then
                print_warning "Commit failed, retrying in 2 seconds..."
                sleep 2
            fi
        fi
    done
    
    print_error "Commit failed after $max_retries attempts"
    return 1
}

# Function to push to remote with authentication
safe_push() {
    local max_retries=3
    local retry_count=0
    local remote_url
    
    # Get current remote URL
    remote_url=$(git remote get-url origin)
    
    # Configure Git to use token authentication
    if [[ "$remote_url" =~ ^https://github.com/ ]]; then
        # For HTTPS, temporarily configure credential helper
        git config --local credential.helper "!f() { echo username=token; echo password=$GITHUB_TOKEN; }; f"
        
        while (( retry_count < max_retries )); do
            print_status "Pushing to remote (attempt $((retry_count + 1))/$max_retries)..."
            
            if git push origin "$(git branch --show-current)" 2>/dev/null; then
                print_success "Push successful"
                # Clean up credential helper
                git config --local --unset credential.helper
                return 0
            else
                retry_count=$((retry_count + 1))
                if (( retry_count < max_retries )); then
                    print_warning "Push failed, retrying in 3 seconds..."
                    sleep 3
                fi
            fi
        done
        
        # Clean up credential helper even on failure
        git config --local --unset credential.helper
    else
        print_error "Only HTTPS GitHub URLs supported for token authentication"
        print_status "Current remote: $remote_url"
        return 1
    fi
    
    print_error "Push failed after $max_retries attempts"
    return 1
}

# Function to show git status in a clean format
show_status() {
    print_status "Current Git Status:"
    echo "===================="
    
    # Show branch
    local branch
    branch=$(git branch --show-current 2>/dev/null || echo "detached HEAD")
    echo "Branch: $branch"
    
    # Show staged files
    local staged_files
    staged_files=$(git diff --cached --name-only)
    
    if [[ -n "$staged_files" ]]; then
        echo ""
        echo "Staged files:"
        echo "$staged_files" | sed 's/^/  ✓ /'
    fi
    
    # Show unstaged changes
    local unstaged_files
    unstaged_files=$(git diff --name-only)
    
    if [[ -n "$unstaged_files" ]]; then
        echo ""
        echo "Unstaged changes:"
        echo "$unstaged_files" | sed 's/^/  ⚠ /'
    fi
    
    # Show untracked files
    local untracked_files
    untracked_files=$(git ls-files --others --exclude-standard)
    
    if [[ -n "$untracked_files" ]]; then
        echo ""
        echo "Untracked files:"
        echo "$untracked_files" | sed 's/^/  ? /'
    fi
    
    echo "===================="
}

# Function to auto-stage relevant files
auto_stage_files() {
    local staged_count=0
    
    print_status "Auto-staging relevant files..."
    
    # Stage modified and new files (excluding sensitive ones)
    while IFS= read -r -d '' file; do
        # Skip sensitive files
        if [[ "$file" =~ \.(env|key|pem|p12|jks)$ ]] || 
           [[ "$file" =~ /(\.env|\.env\.|credentials|secrets)/ ]]; then
            print_warning "Skipping sensitive file: $file"
            continue
        fi
        
        # Skip very large files
        if [[ -f "$file" ]]; then
            local size_bytes
            size_bytes=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo 0)
            local size_mb=$((size_bytes / 1024 / 1024))
            
            if (( size_mb > MAX_FILE_SIZE_MB )); then
                print_warning "Skipping large file: $file (${size_mb}MB)"
                continue
            fi
        fi
        
        git add "$file"
        staged_count=$((staged_count + 1))
    done < <(git ls-files --modified --others --exclude-standard -z)
    
    if (( staged_count > 0 )); then
        print_success "Staged $staged_count files"
    else
        print_warning "No files to stage"
    fi
}

# Main execution function
main() {
    print_status "Starting Arketic Task Commit Process..."
    echo "========================================"
    
    # Load environment and validate setup
    load_env
    check_git_status
    
    # Show current status
    show_status
    
    # Check if there are any changes to commit
    if ! git diff --cached --quiet || ! git diff --quiet || [[ -n $(git ls-files --others --exclude-standard) ]]; then
        
        # Auto-stage files if nothing is staged
        if git diff --cached --quiet; then
            auto_stage_files
        fi
        
        # Final check for staged files
        if git diff --cached --quiet; then
            print_warning "No changes staged for commit."
            print_status "Use 'git add <files>' to stage changes first."
            exit 0
        fi
        
        # Validate file sizes and check if batching is needed
        local size_check_result
        check_file_sizes
        size_check_result=$?
        
        # Generate commit message
        local commit_message
        commit_message=$(generate_commit_message)
        
        print_status "Generated commit message:"
        echo "------------------------"
        echo "$commit_message"
        echo "------------------------"
        
        # Auto-mode: skip confirmation
        if [[ "$AUTO_MODE" == "true" ]]; then
            print_status "Auto-mode: Proceeding with commit..."
        else
            # Confirm commit
            read -p "Proceed with commit? (Y/n): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Nn]$ ]]; then
                print_status "Commit cancelled by user."
                exit 0
            fi
        fi
        
        # Handle different size check results
        if (( size_check_result == 2 )); then
            # Need to batch commits
            print_status "Creating commit batches due to size constraints..."
            
            local num_batches
            num_batches=$(create_batches)
            
            if (( num_batches > 0 )); then
                print_status "Created $num_batches batches. Committing sequentially..."
                
                if commit_batches "$num_batches" "$commit_message"; then
                    print_success "All batches committed successfully!"
                    
                    # Auto-mode: automatically push
                    if [[ "$AUTO_MODE" == "true" ]]; then
                        print_status "Auto-mode: Pushing all commits to remote..."
                        if safe_push; then
                            print_success "All commits pushed successfully!"
                        else
                            print_warning "Commits successful but push failed. You can push manually later."
                        fi
                    else
                        # Ask about pushing all commits
                        read -p "Push all commits to remote? (Y/n): " -n 1 -r
                        echo
                        if [[ ! $REPLY =~ ^[Nn]$ ]]; then
                            if safe_push; then
                                print_success "All commits pushed successfully!"
                            else
                                print_warning "Commits successful but push failed. You can push manually later."
                            fi
                        else
                            print_success "All commits successful. Remember to push when ready."
                        fi
                    fi
                else
                    print_error "Failed to commit some batches. Please check and try again."
                    exit 1
                fi
            else
                print_error "Failed to create batches. Please try again."
                exit 1
            fi
            
        elif (( size_check_result == 0 )); then
            # Normal single commit
            if safe_commit "$commit_message"; then
                local commit_hash
                commit_hash=$(git rev-parse --short HEAD)
                print_success "Committed as $commit_hash"
                
                # Auto-mode: automatically push
                if [[ "$AUTO_MODE" == "true" ]]; then
                    print_status "Auto-mode: Pushing to remote..."
                    if safe_push; then
                        print_success "Task commit process completed successfully!"
                    else
                        print_warning "Commit successful but push failed. You can push manually later."
                    fi
                else
                    # Ask about pushing
                    read -p "Push to remote? (Y/n): " -n 1 -r
                    echo
                    if [[ ! $REPLY =~ ^[Nn]$ ]]; then
                        if safe_push; then
                            print_success "Task commit process completed successfully!"
                        else
                            print_warning "Commit successful but push failed. You can push manually later."
                        fi
                    else
                        print_success "Commit successful. Remember to push when ready."
                    fi
                fi
            else
                print_error "Commit failed. Please check the error and try again."
                exit 1
            fi
        else
            # Error in size check
            print_error "File size validation failed. Please resolve issues and try again."
            exit 1
        fi
        
    else
        print_warning "No changes detected. Nothing to commit."
    fi
    
    echo "========================================"
    print_success "Arketic Task Commit Process Complete"
}

# Handle script interruption
trap 'print_error "Script interrupted by user"; exit 130' INT

# Execute main function
main "$@"