#Install dependencies
FROM node:alpine as modules
WORKDIR /user/src/app

#Copy over package.json and package-lock.json
COPY package*.json ./

RUN npm install

#Build webpack artifacts
FROM node:alpine as artifacts
WORKDIR /srv/www/src/app

#Set env args... docker compose???
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

#Copy over dependencies
COPY --from=modules /srv/www/src/app/node_modules node_modules
COPY src ./src
COPY package.json .
COPY webpack.config.js .

COPY .eslintrc .
COPY .babelrc .

RUN npm run build

#Backend
FROM node:carbon
LABEL Description="Code-Witch" Version="0.1" Author="IZALEU"

WORKDIR /srv/www/src/app/

COPY --from=artifacts /srv/www/src/app/public public
COPY server.js /srv/www/src/app/
COPY backend /srv/www/src/app/backend/

RUN npm install express

EXPOSE 1234

CMD ["node", "server.js"]
