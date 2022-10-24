FROM node:19-buster

WORKDIR /server

ENV NODE_ENV=development

COPY package.json yarn.lock ./

COPY . .

EXPOSE 7000

RUN yarn install

CMD [ "yarn", "test:actions" ]