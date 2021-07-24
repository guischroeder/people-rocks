FROM node:12.16.2-alpine

WORKDIR /usr/src/app/

COPY --chown=node:node yarn.lock package.json ./
RUN yarn

COPY --chown=node:node . ./

RUN yarn build

CMD ["yarn", "start:dev"]
