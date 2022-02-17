FROM node:14.17.0-alpine3.12

RUN npm i -g typescript

USER node

WORKDIR /home/node/app
