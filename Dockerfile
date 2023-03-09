FROM node:16-alpine as builder
WORKDIR /app/builder
COPY . .
RUN npm i