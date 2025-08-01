# Arketic Task Commit Script

## Overview
`commit_task.sh` is a comprehensive GitHub commit script designed for the Arketic project. It safely handles task completion commits with proper error handling, file size validation, and GitHub token authentication.

## Features

### 🔒 Security
- Uses `GITHUB_TOKEN` from `.env` file (never hardcoded)
- Skips sensitive files (.env, .key, .pem, etc.)
- Validates token format
- Temporary credential helper setup

### 📊 File Size Management & Auto-Batching
- Checks individual file sizes (max 25MB)
- Validates total commit size (max 50MB)
- **Automatically splits large commits into smaller batches**
- Creates multiple sequential commits when size limit exceeded
- Intelligent file batching by size optimization
- Warns about large files and suggests Git LFS

### 🚀 Smart Features
- Auto-stages relevant files
- Generates intelligent commit messages
- Extracts task keys from branch names (AR-XXX-TXX)
- Shows comprehensive git status
- Retry logic for network operations

### ⚠️ Error Handling
- Comprehensive validation checks
- Graceful failure handling
- User confirmation prompts
- Colored output for clarity

## Setup

### 1. Create Environment File
```bash
cp .env.example .env
# Edit .env and add your GitHub token:
# GITHUB_TOKEN=ghp_your_token_here
```

### 2. Make Script Executable
```bash
chmod +x commit_task.sh
```

## Usage

### Basic Usage
```bash
./commit_task.sh
```

The script will:
1. Validate environment and git setup
2. Show current git status
3. Auto-stage relevant files (if none staged)
4. Check file sizes and validate commit
5. **Automatically create batches if size exceeds 50MB**
6. Generate smart commit message(s)
7. Ask for confirmation before committing
8. Commit single or multiple batches as needed
9. Optionally push all commits to remote

### Expected Workflow
1. Complete your task implementation
2. Run `./commit_task.sh`
3. Review the changes and commit message
4. Confirm commit (Y/n)
5. Confirm push (Y/n)

## File Size Limits

- **Individual files**: 25MB maximum
- **Total commit**: 50MB maximum
- **Large file handling**: Warns and prompts for confirmation
- **Git LFS suggestion**: For files exceeding limits

## Commit Message Format

The script generates intelligent commit messages:

### With Task Key (from branch name)
```
[AR-123-T1] Task implementation completed

Files modified: src/components/TaskView.tsx, src/api/tasks.js
```

### Batched Commits (when size > 50MB)
```
[AR-123-T1] Task implementation completed (part 1/3)

Batch size: 45MB, Files: 25

[AR-123-T1] Task implementation completed (part 2/3)

Batch size: 38MB, Files: 18

[AR-123-T1] Task implementation completed (part 3/3)

Batch size: 12MB, Files: 8
```

### Without Task Key
```
Task implementation completed

Files modified: Multiple files (8 changed)
```

## Error Scenarios

### Missing .env File
```bash
[ERROR] .env file not found. Please create one with GITHUB_TOKEN.
[INFO] You can copy from .env.example: cp .env.example .env
```

### Invalid Git Repository
```bash
[ERROR] Not a git repository. Initialize with: git init
```

### No Remote Configured
```bash
[ERROR] No remote 'origin' configured.
[INFO] Add remote with: git remote add origin <url>
```

### Files Too Large
```bash
[ERROR] Commit size too large: 75MB (max: 50MB)
[INFO] Consider committing files in smaller batches.
```

### Missing GitHub Token
```bash
[ERROR] GITHUB_TOKEN not found in .env file.
[INFO] Please add: GITHUB_TOKEN=your_token_here
```

## Advanced Features

### Auto-Staging Logic
- Stages modified and new files automatically
- Skips sensitive files (`.env`, `.key`, `.pem`, etc.)
- Skips oversized files (>25MB)
- Provides feedback on skipped files

### Retry Mechanism
- Commit operations: 3 attempts
- Push operations: 3 attempts with backoff
- Network error resilience

### File Exclusions
The script automatically excludes:
- Sensitive files: `.env*`, `*.key`, `*.pem`, `*.p12`, `*.jks`
- Credential directories: `/credentials/`, `/secrets/`
- Large files exceeding size limits

## Integration with Execute Task

This script is designed to work after running `/execute_task` command:

1. `/execute_task` completes task implementation
2. Task moves to TEST status after user confirmation
3. Run `./commit_task.sh` to commit the changes
4. Changes are safely committed and pushed to GitHub

## Troubleshooting

### Script Permission Issues
```bash
chmod +x commit_task.sh
```

### Git Authentication Issues
- Ensure GITHUB_TOKEN is valid and has repository access
- Check if repository URL is HTTPS format
- Verify token permissions (repo scope required)

### Large File Issues
- Use Git LFS: `git lfs track "*.large_extension"`
- Break commits into smaller chunks
- Consider excluding unnecessary large files

## Security Best Practices

- ✅ Never commit the `.env` file
- ✅ Use personal access tokens with minimal required scope
- ✅ Review staged files before confirming commit
- ✅ The script automatically skips sensitive files
- ⚠️ Always review commit contents before pushing

## Exit Codes

- `0`: Success
- `1`: General error (missing requirements, validation failure)
- `130`: User interruption (Ctrl+C)