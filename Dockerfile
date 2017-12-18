#Install dependencies
FROM node:alpine as modules
WORKDIR /user/src/app

#Copy over package.json and package-lock.json
COPY package*.json ./

RUN npm install

#Build webpack artifacts
FROM node:alpine as artifacts
LABEL Description="Code-Witch Frontend" Version="0.1" Author="IZALEU"
WORKDIR /user/src/app

#Set env args... docker compose???
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

#Copy over dependencies
COPY --from=modules /user/src/app/node_modules node_modules
COPY src ./src
COPY package.json .
COPY webpack.config.js .

COPY .eslintrc .
COPY .babelrc .

RUN npm run build

#Server
FROM node:carbon
LABEL Description="Code-Witch backend" Version="0.1" Author="IZALEU"

WORKDIR /user/src/app/

COPY --from=artifacts /user/src/app/build public
COPY server.js /user/src/app/

RUN npm install express

EXPOSE 1234

CMD ["node", "server.js"]
