FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build 

FROM node:20-alpine AS runtime

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package*.json ./
COPY .env ./

RUN npm ci --only=production 

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/index.js"]
