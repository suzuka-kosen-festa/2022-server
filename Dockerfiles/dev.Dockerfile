FROM node:16

WORKDIR /app

ENV NODE_ENV=development

COPY package.json yarn.lock ./

COPY . .

EXPOSE 6000

CMD [ "yarn", "start:dev" ]