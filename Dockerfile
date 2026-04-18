FROM oven/bun:1-alpine AS builder
WORKDIR /app

# Copy everything
COPY . .

# Install all dependencies
RUN bun install

# Build arguments for Next.js public vars
ARG POSTGRES_URL
ARG JWE_SECRET
ARG ENCRYPTION_KEY
ARG NEXT_PUBLIC_VERCEL_APP_CLIENT_ID
ARG NEXT_PUBLIC_GITHUB_CLIENT_ID
ARG NEXT_PUBLIC_GITHUB_APP_SLUG
ARG NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build only the web app
RUN bun run build --filter=web

# Production image
FROM oven/bun:1-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy everything from builder
COPY --from=builder /app .

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["sh", "-c", "cd apps/web && bun run start"]
