FROM node:erbium-alpine

EXPOSE 9979
WORKDIR /home/node/puuuudding.com-server

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . ./
RUN yarn build

CMD node ./dist/main.js
