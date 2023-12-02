# Use a specific Node.js and Alpine Linux version
ARG NODE_VERSION="18"
ARG ALPINE_VERSION="3.17"

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS production

# Install OpenSSL 1.1.x, needed for Linux Alpine 3.17+
RUN apk update && apk add openssl1.1-compat

ARG APP_MODE=development
ENV APP_MODE=${APP_MODE}

WORKDIR /usr/src/app

# Copy necessary files and folders
COPY ./src/common/envs /.env.*  ./
COPY package*.json ./
COPY prisma ./prisma/
COPY swagger-spec.json ./
COPY /.env.*  ./
COPY package*.json ./
COPY prisma ./prisma/
COPY prisma/schema.prisma ./prisma/
COPY . .
COPY prisma ./prisma/

# Install project dependencies
RUN npm install

# Install global packages and dependencies
RUN npm install -g @nestjs/cli
RUN npm install prisma @prisma/client
RUN npx prisma generate

# Install project dependencies
RUN npm install

# Build and seed the application
RUN npm run build
RUN npx prisma generate
# RUN npm run migrate
# RUN npm run seed

# Set environment variables
ENV APP_PORT 3000
ENV APP_PORT 48525

CMD [ "node", "./dist/src/main.js" ]