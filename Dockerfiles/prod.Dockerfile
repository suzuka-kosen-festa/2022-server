FROM node:19 AS build

WORKDIR /build

ENV NODE_ENV=development

COPY package.json yarn.lock ./

COPY prisma ./prisma

RUN \
yarn install --immutable;\
yarn run prisma generate

COPY . ./
RUN yarn build

FROM node:19 AS deps

WORKDIR /deps

ENV NODE_ENV=production

COPY package.json yarn.lock ./

RUN yarn install --immutable

FROM node:19

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /build/dist /app/dist
COPY --from=deps /deps/node_modules /app/node_modules
COPY prisma ./prisma
COPY package.json ./
COPY ./start.sh ./


EXPOSE 7000

CMD ["./start.sh"]