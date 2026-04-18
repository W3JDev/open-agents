FROM oven/bun:1-alpine AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lock turbo.json tsconfig.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/agent/package.json ./packages/agent/
COPY packages/sandbox/package.json ./packages/sandbox/
COPY packages/shared/package.json ./packages/shared/
RUN bun install --frozen-lockfile

# Build the application
FROM deps AS builder
COPY . .
ARG POSTGRES_URL
ARG JWE_SECRET
ARG ENCRYPTION_KEY
ARG NEXT_PUBLIC_VERCEL_APP_CLIENT_ID
ARG NEXT_PUBLIC_GITHUB_CLIENT_ID
ARG NEXT_PUBLIC_GITHUB_APP_SLUG
ARG NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN bun run build --filter=web

# Production image
FROM oven/bun:1-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=builder /app ./
EXPOSE 3000
ENV PORT=3000
CMD ["sh", "-c", "cd apps/web && bun run start"]
