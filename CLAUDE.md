# Claude Code Commands

## Project Management Commands

### `/create_story` - Jira Story Creation
**Script Location:** `.claude/commands/create_story.md`

Interactive story creation workflow for Product Managers. Creates Jira stories with structured information gathering and MCP integration.

**Usage:**
```bash
/create_story [story_type] [--project PROJECT_KEY]
```

**Story Types:** `feature`, `enhancement`, `research`, `infrastructure`, `integration`

**Example:**
```bash
/create_story feature --project ARKT
```

---

## Developer Commands (Future)

### `/create_task` - Task Creation from Story
**Script Location:** `.claude/commands/create_task.md`

Creates development tasks from existing Jira stories.

### `/refine_story` - Story Refinement  
**Script Location:** `.claude/commands/refine_story.md`

Refines existing stories with additional details or updates.
