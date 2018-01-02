# fetch npm modules on the 'big' node image, which enables git
FROM node:latest as modules
WORKDIR /srv/www

# todo: find out why npm install --only=prod/dev isn't working
COPY package*.json ./
RUN npm install

# create build artifacts using dependencies from modules
FROM node:alpine as artifacts
WORKDIR /srv/www

COPY --from=modules /srv/www/node_modules node_modules
COPY src ./src
COPY package*.json ./
COPY webpack.*.js ./
COPY .eslintrc .
COPY .babelrc .

# runs webpack build
RUN npm run-script dist

# copy build artifacts and start the server
FROM node:alpine
LABEL Description="Code-Witch" Version="0.1" Author="IZALEU"
WORKDIR /srv/www/backend

COPY backend ./
COPY --from=artifacts /srv/www/public public/

RUN npm install

COPY server.js ./server.js

CMD ["node", "server.js"]
