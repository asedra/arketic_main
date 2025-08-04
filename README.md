# Arketic AI Platform

🚀 A full-stack AI-powered application with Next.js frontend, NestJS backend, and PostgreSQL with PGVector extension.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (Next.js)     │◄──►│   (NestJS)      │◄──►│  (PostgreSQL)   │
│   Port: 3000    │    │   Port: 3001    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack

- **Frontend**: Next.js 15 with React 19, TypeScript, TailwindCSS
- **Backend**: NestJS with TypeScript, LangChain.js, OpenAI integration
- **Database**: PostgreSQL 15 with PGVector extension for AI embeddings
- **AI/ML**: OpenAI GPT-4, LangChain.js for AI workflows
- **Infrastructure**: Docker, Docker Compose
- **Development**: ESLint, Prettier, Husky git hooks

## 🚀 Quick Start (Single Command Deployment)

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (version 20.0+)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0+)
- [Git](https://git-scm.com/)

### One-Command Setup

```bash
# Clone the repository
git clone <repository-url>
cd arketic_main

# Copy environment template
cp .env.example .env

# Edit .env file and add your OpenAI API key
# OPENAI_API_KEY=sk-your-openai-api-key-here

# Start all services
docker-compose up --build
```

🎉 **That's it!** Your application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Database: localhost:5432

## 📋 Detailed Setup Instructions

### 1. Environment Configuration

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your configuration:
   ```env
   # Required: Add your OpenAI API key
   OPENAI_API_KEY=sk-your-openai-api-key-here
   
   # Optional: Customize other settings
   JWT_SECRET=your-custom-jwt-secret
   POSTGRES_PASSWORD=your-secure-password
   ```

### 2. Development Mode

For development with hot reloading:

```bash
# Start in development mode
docker-compose -f docker-compose.dev.yml up --build

# Or run individual services
docker-compose -f docker-compose.dev.yml up database backend
```

### 3. Production Deployment

```bash
# Build and start all services in production mode
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🔧 Development

### Local Development (Without Docker)

If you prefer to run services locally:

#### Prerequisites
- Node.js 18+
- PostgreSQL 15 with PGVector extension
- npm or yarn

#### Backend Setup
```bash
cd backend
npm install
npm run start:dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Docker Commands

```bash
# Build and start all services
docker-compose up --build

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f [service-name]

# Stop services
docker-compose down

# Remove volumes (⚠️ deletes data)
docker-compose down -v

# Rebuild specific service
docker-compose build [service-name]
```

## 🌐 API Documentation

### Backend Endpoints

The backend API runs on http://localhost:3001 and includes:

- **Health Check**: `GET /health`
- **AI Services**: `POST /ai/generate`, `POST /ai/chat`
- **Document Management**: `POST /ai/documents`, `GET /ai/documents/search`
- **Swagger Documentation**: http://localhost:3001/api (when running)

### Frontend Routes

- **Home**: http://localhost:3000
- **Health Check**: http://localhost:3000/api/health

## 🔐 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI features | - | ✅ |
| `DATABASE_URL` | PostgreSQL connection string | See .env.example | ✅ |
| `JWT_SECRET` | Secret for JWT tokens | - | ✅ |
| `NODE_ENV` | Environment mode | development | ❌ |
| `PORT` | Backend server port | 3001 | ❌ |

See `.env.example` for complete list and documentation.

## 🐛 Troubleshooting

### Common Issues

**1. Docker permission denied**
```bash
# Add user to docker group (Linux)
sudo usermod -aG docker $USER
# Log out and back in
```

**2. Port already in use**
```bash
# Check what's using the port
lsof -i :3000
# Kill the process or change ports in docker-compose.yml
```

**3. Database connection failed**
```bash
# Wait for database to be ready (check logs)
docker-compose logs database
# Restart services if needed
docker-compose restart backend
```

**4. OpenAI API errors**
- Verify your API key in `.env`
- Check your OpenAI account has credits
- Ensure the key has proper permissions

**5. Build failures**
```bash
# Clean build
docker-compose down
docker system prune -f
docker-compose up --build
```

### Health Checks

Check service status:
```bash
# Backend health
curl http://localhost:3001/health

# Frontend health  
curl http://localhost:3000/api/health

# Database health
curl http://localhost:3001/health/database
```

## 📖 Documentation

- [Setup Guide](./docs/setup.md) - Detailed setup instructions
- [Development Guide](./docs/development.md) - Development workflows and guidelines
- [API Reference](http://localhost:3001/api) - Interactive API documentation (Swagger)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

### Development Scripts

```bash
# Backend
cd backend
npm run lint          # Run ESLint
npm run test          # Run tests
npm run build         # Build for production

# Frontend  
cd frontend
npm run lint          # Run ESLint
npm run type-check    # TypeScript checking
npm run build         # Build for production
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter issues:

1. Check the [troubleshooting section](#🐛-troubleshooting)
2. Search existing GitHub issues
3. Create a new issue with:
   - Your environment details
   - Steps to reproduce
   - Error logs
   - Expected vs actual behavior

## 🚀 Deployment

### Production Checklist

- [ ] Set strong passwords in `.env`
- [ ] Configure proper JWT secret
- [ ] Set up SSL/HTTPS
- [ ] Configure backup strategy
- [ ] Set up monitoring
- [ ] Review security settings

---

**Built with ❤️ by the Arketic Team**