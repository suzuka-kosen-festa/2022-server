FROM gcr.io/distroless/nodejs:16

WORKDIR /app

ENV NODE_ENV=development

COPY package.json yarn.lock ./

COPY . .