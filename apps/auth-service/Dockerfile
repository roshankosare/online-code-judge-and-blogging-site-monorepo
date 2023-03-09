FROM node:16-alpine as development

WORKDIR /usr/src/app

COPY package*.json .

RUN npm i

COPY . .

RUN npx nx build auth-service

CMD [ "node" ,"./dist/apps/auth-service/main.js" ]

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci --only=production

COPY --from=development /urs/src/app/dist ./dist

CMD ["node","dist/main.js"]
 