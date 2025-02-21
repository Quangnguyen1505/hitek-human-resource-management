FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache python3 make g++

RUN npm install

COPY . .

# Development stage
FROM builder AS development

ENV NODE_ENV=development

EXPOSE 3000

CMD ["npm", "run", "dev"]

# Production stage
FROM builder AS production

ENV NODE_ENV=production

CMD ["npm", "start"]
