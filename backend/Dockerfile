# Arketic Backend - Multi-stage Docker Build
# Stage 1: Dependencies
FROM node:20-alpine AS base

# Install system dependencies and update npm
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    libc6-compat \
    curl && \
    npm install -g npm@latest && \
    npm config set fetch-timeout 300000 && \
    npm config set fetch-retries 5 && \
    npm config set fetch-retry-factor 2 && \
    npm config set fetch-retry-mintimeout 10000 && \
    npm config set fetch-retry-maxtimeout 60000

FROM base AS deps
WORKDIR /app

# Copy package files for dependency installation
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm \
    for i in 1 2 3; do npm ci --omit=dev && break || (echo "npm ci attempt $i failed, retrying..." && sleep $((i * 10))); done

# Stage 2: Build dependencies (includes devDependencies)
FROM base AS build-deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm \
    for i in 1 2 3; do npm ci && break || (echo "npm ci attempt $i failed, retrying..." && sleep $((i * 10))); done

# Stage 3: Build the application
FROM build-deps AS builder
WORKDIR /app

# Copy source code
COPY . .

# Build the NestJS application
ENV NODE_ENV=production
RUN npm run build

# Stage 4: Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs

# Copy production dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy built application
COPY --from=builder --chown=nestjs:nestjs /app/dist ./dist
COPY --from=builder --chown=nestjs:nestjs /app/package.json ./

# Switch to non-root user
USER nestjs

# Expose the port the app runs on
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Start the application
CMD ["npm", "run", "start:prod"]