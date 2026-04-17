FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g yarn --force

# --- dependencies ---
FROM base AS deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# --- build ---
FROM deps AS builder
COPY . .
RUN yarn build

# --- production ---
FROM node:20-alpine AS runner
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/main"]
