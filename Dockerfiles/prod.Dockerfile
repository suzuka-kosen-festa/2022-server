FROM node:16 AS build

WORKDIR /build

ENV NODE_ENV=development

COPY package.json yarn.lock ./
RUN yarn install --immutable

COPY . ./
RUN yarn build

FROM node:16 AS deps

WORKDIR /deps

ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn install --immutable

FROM gcr.io/distroless/nodejs:16

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /build/dist /app/dist
COPY --from=deps /deps/node_modules /app/node_modules

EXPOSE 6000

CMD ["node","dist/main"]