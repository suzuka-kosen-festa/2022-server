FROM node:19-buster

WORKDIR /server

ENV NODE_ENV=development

COPY package.json yarn.lock ./

RUN yarn install --immutable

COPY . .

EXPOSE 7000