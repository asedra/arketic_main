# Arketic AI Platform - Detailed Setup Guide

This guide provides comprehensive setup instructions for the Arketic AI Platform.

## 📋 Prerequisites

### System Requirements

- **Operating System**: Linux, macOS, or Windows with WSL2
- **RAM**: Minimum 4GB, Recommended 8GB+
- **Disk Space**: At least 5GB free space
- **Internet**: Required for downloading Docker images and AI model access

### Required Software

1. **Docker Engine** (version 20.0+)
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   
   # macOS
   # Download Docker Desktop from https://docker.com
   
   # Windows
   # Install Docker Desktop with WSL2 backend
   ```

2. **Docker Compose** (version 2.0+)
   ```bash
   # Usually included with Docker Desktop
   # For Linux, install separately:
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

3. **Git**
   ```bash
   # Ubuntu/Debian
   sudo apt install git
   
   # macOS
   brew install git
   
   # Windows
   # Download from https://git-scm.com/
   ```

### OpenAI API Key

1. Create an account at [OpenAI](https://platform.openai.com/)
2. Navigate to [API Keys](https://platform.openai.com/api-keys)
3. Create a new API key
4. Save the key securely (you'll need it for configuration)

## 🚀 Installation Steps

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone <repository-url>
cd arketic_main

# Verify the structure
ls -la
```

Expected structure:
```
arketic_main/
├── backend/          # NestJS backend
├── frontend/         # Next.js frontend
├── database/         # PostgreSQL with PGVector
├── docs/            # Documentation
├── docker-compose.yml
├── docker-compose.dev.yml
├── .env.example
└── README.md
```

### Step 2: Environment Configuration

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file:**
   ```bash
   # Use your preferred editor
   nano .env
   # or
   vim .env
   # or
   code .env
   ```

3. **Configure required variables:**
   ```env
   # REQUIRED: Add your OpenAI API key
   OPENAI_API_KEY=sk-your-actual-openai-api-key-here
   
   # RECOMMENDED: Change default passwords
   POSTGRES_PASSWORD=your-secure-database-password
   JWT_SECRET=your-256-bit-secret-key-here
   
   # OPTIONAL: Customize other settings
   NODE_ENV=production
   PORT=3001
   ```

### Step 3: Docker Setup Verification

1. **Verify Docker installation:**
   ```bash
   docker --version
   docker-compose --version
   ```

2. **Test Docker permissions:**
   ```bash
   docker run hello-world
   ```

   If you get permission errors on Linux:
   ```bash
   sudo usermod -aG docker $USER
   # Log out and back in, then retry
   ```

### Step 4: Build and Start Services

1. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

   This will:
   - Build the frontend Docker image
   - Build the backend Docker image
   - Build the PostgreSQL + PGVector database image
   - Start all services with proper networking
   - Show logs from all services

2. **Start in background mode (detached):**
   ```bash
   docker-compose up --build -d
   
   # View logs
   docker-compose logs -f
   
   # View specific service logs
   docker-compose logs -f backend
   ```

### Step 5: Verify Installation

1. **Check service health:**
   ```bash
   # Backend API health
   curl http://localhost:3001/health
   
   # Frontend health
   curl http://localhost:3000/api/health
   
   # Database health
   curl http://localhost:3001/health/database
   ```

2. **Access the applications:**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:3001
   - **API Documentation**: http://localhost:3001/api (Swagger UI)

3. **Test AI functionality:**
   ```bash
   # Test text generation
   curl -X POST http://localhost:3001/ai/generate \
     -H "Content-Type: application/json" \
     -d '{"prompt": "Hello, how are you?"}'
   ```

## 🔧 Development Setup

### Development Mode

For development with hot reloading and file watching:

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up --build

# Or start individual services
docker-compose -f docker-compose.dev.yml up database
docker-compose -f docker-compose.dev.yml up backend
docker-compose -f docker-compose.dev.yml up frontend
```

Development mode features:
- File watching and hot reloading
- Development dependencies included
- Source maps enabled
- Detailed error messages
- Volume mounts for live code editing

### Local Development (Without Docker)

If you prefer to run services locally:

#### Database Setup
```bash
# Install PostgreSQL 15
sudo apt install postgresql-15 postgresql-15-dev

# Install PGVector extension
git clone https://github.com/pgvector/pgvector.git
cd pgvector
make
sudo make install

# Create database and user
sudo -u postgres createuser arketic_user
sudo -u postgres createdb arketic_db -O arketic_user
sudo -u postgres psql -c "ALTER USER arketic_user PASSWORD 'arketic_password';"
sudo -u postgres psql arketic_db -c "CREATE EXTENSION vector;"
```

#### Backend Setup
```bash
cd backend
npm install
npm run build
npm run start:prod

# Or for development
npm run start:dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run build
npm run start

# Or for development
npm run dev
```

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. Docker Permission Denied
```bash
# Error: permission denied while trying to connect to Docker daemon
sudo usermod -aG docker $USER
newgrp docker
# Or log out and back in
```

#### 2. Port Already in Use
```bash
# Find what's using the port
sudo lsof -i :3000
sudo lsof -i :3001
sudo lsof -i :5432

# Kill the process
sudo kill -9 <PID>

# Or change ports in docker-compose.yml
```

#### 3. Database Connection Issues
```bash
# Check database logs
docker-compose logs database

# Wait for database to be ready
docker-compose logs -f database | grep "ready to accept connections"

# Restart backend if needed
docker-compose restart backend
```

#### 4. Build Failures
```bash
# Clean Docker cache
docker system prune -f
docker volume prune -f

# Rebuild from scratch
docker-compose down -v
docker-compose up --build
```

#### 5. OpenAI API Issues
- Verify API key format: `sk-...`
- Check account has credits
- Test API key manually:
  ```bash
  curl https://api.openai.com/v1/models \
    -H "Authorization: Bearer $OPENAI_API_KEY"
  ```

#### 6. Memory Issues
```bash
# Increase Docker memory limits (Docker Desktop)
# Settings > Resources > Advanced > Memory

# Or use lighter development setup
docker-compose -f docker-compose.dev.yml up database backend
# Run frontend locally: cd frontend && npm run dev
```

### Logging and Debugging

#### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f database

# Last N lines
docker-compose logs --tail=50 backend
```

#### Debug Container Issues
```bash
# Enter container shell
docker-compose exec backend sh
docker-compose exec frontend sh
docker-compose exec database bash

# Check container status
docker-compose ps

# Inspect container
docker inspect arketic_backend
```

#### Network Debugging
```bash
# Test inter-service communication
docker-compose exec frontend ping backend
docker-compose exec backend ping database

# Check network
docker network ls
docker network inspect arketic_main_arketic_network
```

## 🔒 Security Considerations

### Production Deployment

1. **Change default passwords:**
   ```env
   POSTGRES_PASSWORD=very-secure-database-password-123
   JWT_SECRET=your-256-bit-secret-key-generated-securely
   ```

2. **Use secrets management:**
   - Docker Swarm secrets
   - Kubernetes secrets
   - HashiCorp Vault
   - Cloud provider secret management

3. **Enable HTTPS:**
   - Use reverse proxy (nginx, Traefik)
   - Configure SSL certificates
   - Update CORS settings

4. **Network security:**
   - Use internal networks
   - Restrict port exposure
   - Configure firewall rules

### Environment Variables Security

```bash
# Generate secure JWT secret
openssl rand -base64 64

# Generate secure password
openssl rand -base64 32
```

## 📊 Performance Optimization

### Production Optimizations

1. **Docker optimizations:**
   ```dockerfile
   # Multi-stage builds (already implemented)
   # Use .dockerignore files (already implemented)
   # Minimize layers
   # Use specific tags instead of 'latest'
   ```

2. **Database optimizations:**
   ```sql
   -- Create indexes for better performance
   CREATE INDEX IF NOT EXISTS idx_documents_embedding ON documents USING ivfflat (embedding vector_cosine_ops);
   ```

3. **Application optimizations:**
   - Enable caching
   - Use CDN for static assets
   - Configure connection pooling
   - Monitor resource usage

### Monitoring

```bash
# Monitor resource usage
docker stats

# Monitor specific containers
docker stats arketic_backend arketic_frontend arketic_database
```

## 🔄 Updates and Maintenance

### Updating the Application

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up --build

# Or rolling update
docker-compose build
docker-compose up -d
```

### Database Backup

```bash
# Backup database
docker-compose exec database pg_dump -U arketic_user arketic_db > backup.sql

# Restore database
docker-compose exec -T database psql -U arketic_user arketic_db < backup.sql
```

### Health Monitoring

```bash
# Check all services
curl http://localhost:3001/health
curl http://localhost:3000/api/health
curl http://localhost:3001/health/database

# Automated health check script
#!/bin/bash
services=("http://localhost:3001/health" "http://localhost:3000/api/health")
for service in "${services[@]}"; do
  if curl -f "$service" > /dev/null 2>&1; then
    echo "✅ $service is healthy"
  else
    echo "❌ $service is unhealthy"
  fi
done
```

This completes the detailed setup guide. For development workflows and advanced configuration, see the [Development Guide](./development.md).