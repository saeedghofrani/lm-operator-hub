# Dockerfile for running Prisma on Linux Alpine 3.17+

# change with the Node.js version of your choice
ARG NODE_VERSION="18.12.1"

# change with the Linux Alpine version of your choice
ARG ALPINE_VERSION="3.17"

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS development

# install OpenSSL 1.1.x, needed for Linux Alpine 3.17+
RUN apk update \
  && apk add openssl1.1-compat

ARG APP_MODE=development
ENV APP_MODE=${APP_MODE}

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY ./src ./src
COPY ./nest-cli.json ./
COPY ./tsconfig.build.json ./
COPY ./tsconfig.json ./

RUN npm install -g @nestjs/cli
# RUN npm ci --only=development

RUN npm install
RUN npm run build

ENV APP_PORT 3000
ENV APP_PORT 48525

CMD ["node", "dist/main"]