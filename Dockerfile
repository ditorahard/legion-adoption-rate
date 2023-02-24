# Install dependencies only when needed
FROM playcourt/nodejs:16-alpine AS deps
WORKDIR /usr/src/app

# Install dependencies based on the preferred package manager
COPY package.json .npmrc ./

# Setup npm config
ARG NPM_AUTH
RUN npm config set //nexus.playcourt.id/repository/npm-group/:_auth ${NPM_AUTH}
RUN npm install

# Rebuild the source code only when needed
FROM playcourt/nodejs:16-alpine AS builder
WORKDIR /usr/src/app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1


# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM playcourt/nodejs:16-alpine AS runner
WORKDIR /usr/src/app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1


COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# Disable read https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["npx", "next", "start"]
