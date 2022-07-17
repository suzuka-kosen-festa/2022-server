FROM node:18-alpine

WORKDIR /server

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .