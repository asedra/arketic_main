# Create Story Command Script

## Command: /create_story

This script is executed when `/create_story` command is triggered in Claude Code.

### Script Execution Flow

```typescript
// This script will be executed by Claude Code
// Location: .claude/commands/create_story.md

export async function executeCreateStory(args: string[]) {
  const storyType = args[0] || null;
  const projectKey = getArgValue(args, '--project') || 'ARKT';
  
  // Start interactive story creation
  await startStoryCreationWorkflow(storyType, projectKey);
}
```

---

## Interactive Workflow Implementation

### Step 1: Story Type Selection
```markdown
🎯 **STORY CREATION WIZARD**

Story Type Selection:
1. `feature` - Yeni özellik geliştirme
2. `enhancement` - Mevcut özellik iyileştirme  
3. `research` - Araştırma ve analiz
4. `infrastructure` - Altyapı geliştirme
5. `integration` - Sistem entegrasyonu

**Input Required:** Story type seçiniz (1-5) veya type yazınız:
```

### Step 2: Basic Information Collection
```markdown
📝 **BASIC INFORMATION**

🎯 **Story Title:** 
*Example: "Kullanıcı bilgi tabanı oluşturabilmeli"*
**Input Required:** Story title giriniz:

📝 **Story Description:** 
*Ne yapmak istiyoruz? Neden önemli? Kullanıcı için değer nedir?*
**Input Required:** Detaylı açıklama giriniz:

🏷️ **Epic/Theme:** 
*Hangi büyük tema altında?*
Options: Knowledge Management | User Management | Chat System | Assistant Management | Custom
**Input Required:** Epic seçiniz veya yazınız:
```

### Step 3: User Story Format
```markdown
👤 **USER STORY FORMAT**

**As a [role/persona]:**
Options: End User | Admin | Developer | Product Manager | Custom
**Input Required:** Role seçiniz:

**I want to [capability/feature]:**
**Input Required:** İstenen yetenek/özellik:

**So that [benefit/value]:**
**Input Required:** Sağladığı değer/fayda:

---
**Generated User Story:**
As a [role] I want to [capability] so that [benefit]
```

### Step 4: Acceptance Criteria
```markdown
✅ **ACCEPTANCE CRITERIA**

Given-When-Then formatında acceptance criteria ekleyiniz:

**Criterion 1:**
Given: [ön koşul]
When: [aksiyon]  
Then: [beklenen sonuç]
**Input Required:** İlk kriter:

**Additional Criteria:**
Daha fazla kriter var mı? (yes/no)
**Input Required:** yes/no:

[If yes, repeat for additional criteria]
```

### Step 5: Technical Context
```markdown
🏗️ **TECHNICAL CONTEXT**

**Architecture Components:**
☐ Frontend (React)
☐ Backend (NestJS) 
☐ Database (PostgreSQL)
☐ AI/ML (LangChain.js)
☐ Other: [specify]
**Input Required:** İlgili bileşenleri seçiniz (comma separated):

**API Dependencies:**
**Input Required:** Hangi API'ler kullanılacak?:

**Database Changes:**
**Input Required:** Database değişiklikleri gerekli mi? (yes/no/details):

**Related Documentation:**
**Input Required:** İlgili dokümanlar (URLs veya names):
```

### Step 6: Priority & Estimation
```markdown
🔥 **PRIORITY & ESTIMATION**

**Priority Level:**
1. Critical (P0) - Production blocker
2. High (P1) - Important for current sprint
3. Medium (P2) - Important for current release
4. Low (P3) - Nice to have
**Input Required:** Priority seçiniz (1-4):

**Story Points (Planning Poker):**
1. 1 Point - Very Small (< 4 hours)
2. 2 Points - Small (1/2 day)
3. 3 Points - Medium (1 day)
4. 5 Points - Large (2-3 days)
5. 8 Points - Very Large (1 week)
6. 13 Points - XL (Consider breaking down)
**Input Required:** Story points seçiniz (1-6):

**Target Sprint:**
**Input Required:** Hedef sprint adı/numarası:
```

### Step 7: Additional Information
```markdown
🧪 **ADDITIONAL INFORMATION**

**Testing Strategy:**
☐ Unit tests
☐ Integration tests
☐ E2E tests
☐ Manual testing
**Input Required:** Test stratejisi seçiniz:

**UI/UX Requirements:**
**Input Required:** Özel UI/UX gereksinimleri var mı?:

**Security Considerations:**
**Input Required:** Güvenlik gereksinimleri:

**Performance Requirements:**
**Input Required:** Performans gereksinimleri:
```

---

## Story Review & Confirmation

### Review Template Display
```markdown
📋 **STORY REVIEW**
================

📌 **Title:** [Generated Title]
🏷️ **Type:** [Selected Type]
🎯 **Epic:** [Selected Epic]
🔗 **Project:** [Project Key]

👤 **USER STORY:**
As a [role]
I want to [capability] 
So that [benefit]

✅ **ACCEPTANCE CRITERIA:**
1. Given [condition] When [action] Then [result]
2. [Additional criteria...]

🏗️ **TECHNICAL SCOPE:**
- Components: [Selected components]
- APIs: [API dependencies]
- Database: [Database changes]
- Documentation: [Related docs]

🔥 **PRIORITY:** [Priority level]
📊 **STORY POINTS:** [Points]
⏱️ **TARGET SPRINT:** [Sprint]

🧪 **TESTING:**
- Strategy: [Testing approaches]
- Special Requirements: [If any]

📝 **ADDITIONAL NOTES:**
- UI/UX: [Requirements]
- Security: [Considerations]
- Performance: [Requirements]

================

**APPROVAL REQUIRED:**
Type one of the following:
- `approve` - Create story in Jira
- `modify [section]` - Modify specific section
- `cancel` - Cancel story creation

**Input Required:** Your decision:
```

---

## Jira Integration Implementation

### Story Creation Logic
```typescript
// Jira MCP Integration
async function createJiraStory(storyData: StoryData): Promise<string> {
  try {
    const jiraPayload = {
      fields: {
        project: { key: storyData.projectKey },
        summary: storyData.title,
        description: formatDescription(storyData),
        issuetype: { name: "Story" },
        priority: { name: mapPriority(storyData.priority) },
        
        // Custom fields
        customfield_story_points: storyData.storyPoints,
        customfield_acceptance_criteria: formatAcceptanceCriteria(storyData.acceptanceCriteria),
        
        // Labels and components
        labels: generateLabels(storyData),
        components: mapComponents(storyData.technicalComponents),
        
        // Sprint assignment
        customfield_sprint: storyData.targetSprint
      }
    };

    const response = await jiraMCP.createIssue(jiraPayload);
    return response.key; // Returns story ID like ARKT-123
    
  } catch (error) {
    throw new Error(`Jira story creation failed: ${error.message}`);
  }
}
```

### Success Response
```markdown
✅ **SUCCESS!** 

Story created in Jira:
- **Story ID:** [STORY-ID]
- **Title:** [Story Title]
- **URL:** https://yourcompany.atlassian.net/browse/[STORY-ID]
- **Sprint:** [Sprint Name]
- **Epic:** [Epic Name]

📋 **Next Steps:**
1. Story is ready for sprint planning
2. Developers can create tasks: `/create_task [STORY-ID]`
3. Story appears in project backlog
4. Can be refined with: `/refine_story [STORY-ID]`

**Development Ready!** ✨
```

### Error Handling
```markdown
❌ **ERROR:** Story creation failed

**Error Details:** [Error message]

**Possible Solutions:**
1. Check Jira MCP connection
2. Verify project permissions  
3. Validate required fields
4. Check custom field configuration

**Retry Options:**
- `/create_story --retry` - Retry with same data
- `/create_story` - Start over
- `/debug_jira` - Check Jira configuration

**Need Help?** Contact system administrator.
```

---

## Command Arguments & Options

### Usage Patterns
```bash
# Basic usage
/create_story

# With story type
/create_story feature
/create_story enhancement  
/create_story research
/create_story infrastructure
/create_story integration

# With project key
/create_story feature --project ARKT
/create_story --project CORE research

# With template
/create_story --template user_management
/create_story --template knowledge_base

# Quick mode (minimal prompts)
/create_story feature --quick

# Debug mode
/create_story --debug
```

### Environment Variables Required
```bash
# .claude/.env
JIRA_BASE_URL=https://yourcompany.atlassian.net
JIRA_PROJECT_KEY=ARKT
JIRA_USERNAME=your_username
JIRA_API_TOKEN=your_api_token

# Optional
DEFAULT_SPRINT=Sprint-24
DEFAULT_EPIC=ARKT-100
```

---

## Integration with Claude Code

### Command Registration
This script is automatically detected by Claude Code when:
1. File exists at `.claude/commands/create_story.md`
2. Command `/create_story` is used in any conversation
3. Claude Code executes this script with user context

### Data Persistence
```typescript
// Story data is temporarily stored during creation
interface StorySession {
  sessionId: string;
  userId: string;
  storyData: Partial<StoryData>;
  currentStep: number;
  createdAt: Date;
}

// Stored in .claude/.sessions/[sessionId].json
```

### Callback Integration
```typescript
// When story is created successfully
export function onStoryCreated(storyId: string, storyData: StoryData) {
  // Log creation
  console.log(`Story ${storyId} created successfully`);
  
  // Notify team (optional)
  // sendSlackNotification(storyId, storyData);
  
  // Update project metrics
  // updateProjectStats(storyData.projectKey);
}
```
