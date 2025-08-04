# Arketic AI Platform - Development Guide

This guide covers development workflows, coding standards, and best practices for contributing to the Arketic AI Platform.

## 🏗️ Development Environment

### Quick Development Setup

```bash
# Clone and setup
git clone <repository-url>
cd arketic_main

# Setup environment
cp .env.example .env
# Edit .env with your OpenAI API key

# Start development environment
docker-compose -f docker-compose.dev.yml up --build
```

### Development vs Production

| Aspect | Development | Production |
|--------|-------------|------------|
| Hot Reloading | ✅ Enabled | ❌ Disabled |
| Source Maps | ✅ Enabled | ❌ Disabled |
| Debug Logging | ✅ Verbose | ❌ Minimal |
| Optimization | ❌ Disabled | ✅ Enabled |
| Security | ❌ Relaxed | ✅ Strict |
| Dependencies | All included | Production only |

## 🔧 Development Workflows

### 1. Feature Development

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Start development services
docker-compose -f docker-compose.dev.yml up -d database

# Work on individual services
cd backend && npm run start:dev
cd frontend && npm run dev

# Make changes, test, commit
git add .
git commit -m "feat: add new feature"
git push origin feature/your-feature-name
```

### 2. Bug Fixes

```bash
# Create bugfix branch
git checkout -b bugfix/issue-description

# Start relevant services for debugging
docker-compose -f docker-compose.dev.yml up backend database

# Debug and fix
# ... make changes ...

# Test the fix
npm run test
npm run lint

# Commit and push
git commit -m "fix: resolve issue with ..."
git push origin bugfix/issue-description
```

### 3. Testing Workflow

```bash
# Run all tests
npm run test

# Backend tests
cd backend
npm run test           # Unit tests
npm run test:e2e       # End-to-end tests
npm run test:cov       # Coverage report

# Frontend tests
cd frontend
npm run test           # Jest tests
npm run type-check     # TypeScript checking
npm run lint           # ESLint
```

## 📁 Project Structure

```
arketic_main/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── ai/             # AI services (LangChain, OpenAI)
│   │   ├── database/       # Database configuration
│   │   ├── modules/        # Feature modules
│   │   └── main.ts         # Application entry
│   ├── Dockerfile
│   └── package.json
├── frontend/                # Next.js Frontend
│   ├── src/
│   │   ├── app/           # App Router (Next.js 13+)
│   │   ├── components/    # Reusable components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   ├── Dockerfile
│   └── package.json
├── database/               # PostgreSQL + PGVector
│   ├── Dockerfile
│   └── init.sql           # Database initialization
├── docs/                   # Documentation
└── docker-compose*.yml    # Container orchestration
```

### Backend Architecture

```
backend/src/
├── ai/                     # AI Module
│   ├── ai.controller.ts    # API endpoints
│   ├── ai.service.ts       # Business logic
│   ├── ai.module.ts        # Module definition
│   ├── providers/          # External service providers
│   ├── embeddings/         # Vector embeddings
│   └── vectorstore/        # Vector database operations
├── database/               # Database Module
│   ├── entities/           # TypeORM entities
│   └── migrations/         # Database migrations
├── modules/                # Feature modules
├── common/                 # Shared utilities
├── guards/                 # Authentication/authorization
└── interceptors/           # Request/response processing
```

### Frontend Architecture

```
frontend/src/
├── app/                    # Next.js App Router
│   ├── (routes)/           # Route groups
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Base UI components
│   └── features/         # Feature-specific components
├── hooks/                # Custom React hooks
├── types/                # TypeScript definitions
└── utils/                # Utility functions
```

## 🎨 Coding Standards

### TypeScript Configuration

Both frontend and backend use strict TypeScript:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Code Style

**ESLint Configuration:**
- Airbnb style guide base
- TypeScript integration
- React hooks rules
- Import order enforcement

**Prettier Configuration:**
- Single quotes
- Trailing commas
- 2-space indentation
- Line width: 80 characters

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `user-service.ts` |
| Components | PascalCase | `UserProfile.tsx` |
| Variables | camelCase | `userName` |
| Constants | SCREAMING_SNAKE_CASE | `API_BASE_URL` |
| Types/Interfaces | PascalCase | `UserData` |
| Enums | PascalCase | `UserRole` |

### Backend Conventions

```typescript
// Service naming
@Injectable()
export class UserService {
  async findUser(id: string): Promise<User> {
    // Implementation
  }
}

// Controller naming
@Controller('users')
export class UserController {
  @Get(':id')
  async getUser(@Param('id') id: string) {
    // Implementation
  }
}

// Entity naming
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
```

### Frontend Conventions

```typescript
// Component naming
export function UserProfile({ userId }: UserProfileProps) {
  // Implementation
}

// Hook naming
export function useUserData(userId: string) {
  // Implementation
}

// Type naming
export interface UserProfileProps {
  userId: string;
}
```

## 🧪 Testing Guidelines

### Backend Testing

**Unit Tests:**
```typescript
describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should find user by id', async () => {
    const result = await service.findUser('123');
    expect(result).toBeDefined();
  });
});
```

**Integration Tests:**
```typescript
describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/123 (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/123')
      .expect(200);
  });
});
```

### Frontend Testing

**Component Tests:**
```typescript
import { render, screen } from '@testing-library/react';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  it('renders user name', () => {
    render(<UserProfile userId="123" />);
    expect(screen.getByText('User Name')).toBeInTheDocument();
  });
});
```

**Hook Tests:**
```typescript
import { renderHook } from '@testing-library/react';
import { useUserData } from './useUserData';

describe('useUserData', () => {
  it('fetches user data', async () => {
    const { result, waitForNextUpdate } = renderHook(() => 
      useUserData('123')
    );
    
    await waitForNextUpdate();
    expect(result.current.data).toBeDefined();
  });
});
```

### Test Organization

```
backend/
├── src/
│   └── **/*.spec.ts        # Unit tests next to source files
└── test/
    └── **/*.e2e-spec.ts    # End-to-end tests

frontend/
├── src/
│   └── **/*.test.tsx       # Component tests next to components
└── __tests__/
    └── **/*.test.ts        # Utility and hook tests
```

## 🔄 Git Workflow

### Branch Naming

- `feature/feature-name` - New features
- `bugfix/bug-description` - Bug fixes
- `hotfix/critical-fix` - Critical production fixes
- `chore/maintenance-task` - Maintenance tasks

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(auth): add JWT authentication
fix(api): resolve CORS configuration issue
docs(readme): update setup instructions
style(lint): fix ESLint warnings
refactor(database): optimize query performance
test(user): add unit tests for user service
chore(deps): update dependencies
```

### Pull Request Process

1. **Create feature branch**
2. **Make changes with tests**
3. **Ensure all checks pass:**
   ```bash
   npm run lint
   npm run test
   npm run build
   ```
4. **Create pull request**
5. **Code review**
6. **Merge after approval**

## 🚀 Deployment

### Development Deployment

```bash
# Build and deploy to development
docker-compose -f docker-compose.dev.yml up --build -d

# Check logs
docker-compose -f docker-compose.dev.yml logs -f
```

### Production Deployment

```bash
# Build for production
docker-compose build

# Deploy with zero downtime
docker-compose up -d --no-deps --build backend
docker-compose up -d --no-deps --build frontend
```

### Environment Management

| Environment | Docker Compose File | Purpose |
|-------------|-------------------|---------|
| Development | `docker-compose.dev.yml` | Local development |
| Production | `docker-compose.yml` | Production deployment |
| Testing | Custom configuration | CI/CD testing |

## 🔍 Debugging

### Backend Debugging

```bash
# Enable debug mode
NODE_ENV=development npm run start:debug

# Or with Docker
docker-compose -f docker-compose.dev.yml up backend

# View detailed logs
docker-compose logs -f backend
```

### Frontend Debugging

```bash
# Enable development mode
npm run dev

# View browser console for client-side issues
# Use React Developer Tools browser extension
```

### Database Debugging

```bash
# Connect to database
docker-compose exec database psql -U arketic_user -d arketic_db

# View query logs
docker-compose logs database | grep "LOG:"

# Check database health
curl http://localhost:3001/health/database
```

### AI Service Debugging

```bash
# Test OpenAI connection
curl -X POST http://localhost:3001/ai/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Test prompt"}'

# Check AI service logs
docker-compose logs backend | grep "AIService"
```

## 📊 Performance Monitoring

### Development Monitoring

```bash
# Monitor resource usage
docker stats

# Monitor specific services
docker stats arketic_backend_dev arketic_frontend_dev

# Check memory usage
docker-compose exec backend ps aux
```

### Production Monitoring

- **Application Performance Monitoring (APM)**
  - Use tools like New Relic, DataDog, or Sentry
  - Monitor response times, error rates, throughput

- **Infrastructure Monitoring**
  - Docker resource usage
  - Database performance
  - Network latency

- **Log Aggregation**
  - Centralized logging with ELK stack
  - Structured logging format
  - Log rotation and retention

## 🔧 IDE Setup

### VS Code Configuration

**.vscode/settings.json:**
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.autoFixOnSave": true,
  "typescript.suggest.autoImports": true
}
```

**.vscode/extensions.json:**
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### Recommended Extensions

- **TypeScript**: Enhanced TypeScript support
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Tailwind CSS**: CSS utility classes
- **Docker**: Container management
- **Thunder Client**: API testing

## 📝 Documentation

### Code Documentation

```typescript
/**
 * Creates a new user in the system
 * @param userData - User information to create
 * @returns Promise resolving to created user
 * @throws UserAlreadyExistsError when email is taken
 */
async createUser(userData: CreateUserDto): Promise<User> {
  // Implementation
}
```

### API Documentation

- **Swagger/OpenAPI**: Automatically generated from decorators
- **Postman Collections**: For manual API testing
- **README Updates**: Keep documentation current

### Component Documentation

```typescript
interface UserProfileProps {
  /** Unique identifier for the user */
  userId: string;
  /** Whether to show edit controls */
  editable?: boolean;
  /** Callback when user data changes */
  onUserChange?: (user: User) => void;
}

/**
 * UserProfile displays user information with optional editing
 * 
 * @example
 * <UserProfile 
 *   userId="123" 
 *   editable={true}
 *   onUserChange={handleUserChange}
 * />
 */
export function UserProfile({ userId, editable, onUserChange }: UserProfileProps) {
  // Implementation
}
```

This development guide covers the essential workflows and standards for contributing to the Arketic AI Platform. For deployment and production considerations, refer to the main [README.md](../README.md).