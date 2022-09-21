FROM node:16-buster

WORKDIR /server

ENV NODE_ENV=development

COPY package.json yarn.lock ./

COPY . .

EXPOSE 6000