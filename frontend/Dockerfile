# Arketic Frontend - Multi-stage Docker Build
# Stage 1: Dependencies and Build
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat curl && \
    npm install -g npm@latest && \
    npm config set fetch-timeout 300000 && \
    npm config set fetch-retries 5 && \
    npm config set fetch-retry-factor 2 && \
    npm config set fetch-retry-mintimeout 10000 && \
    npm config set fetch-retry-maxtimeout 60000
WORKDIR /app

# Copy package files for dependency installation
COPY package.json package-lock.json* ./
# Skip prepare script for production build
RUN --mount=type=cache,target=/root/.npm \
    for i in 1 2 3; do npm ci --omit=dev --ignore-scripts && break || (echo "npm ci attempt $i failed, retrying..." && sleep $((i * 10))); done

# Stage 2: Build the application
FROM base AS builder
RUN npm install -g npm@latest && \
    npm config set fetch-timeout 300000 && \
    npm config set fetch-retries 5 && \
    npm config set fetch-retry-factor 2 && \
    npm config set fetch-retry-mintimeout 10000 && \
    npm config set fetch-retry-maxtimeout 60000
WORKDIR /app
# Copy package files and install ALL dependencies for build
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm \
    for i in 1 2 3; do npm ci --ignore-scripts && break || (echo "npm ci attempt $i failed, retrying..." && sleep $((i * 10))); done
COPY . .

# Environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build the Next.js application
RUN npm run build

# Stage 3: Production image
FROM base AS runner
WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder stage
# Public folder is optional in Next.js

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start the application
CMD ["node", "server.js"]