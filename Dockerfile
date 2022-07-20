FROM node:16-alpine

WORKDIR /server

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .