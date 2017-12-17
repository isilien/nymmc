FROM node:carbon
LABEL Description="Code-Witch" Version="0.1" Author="IZALEU"

WORKDIR /user/src/app/backend

COPY backend/package*.json ./

RUN npm install

COPY backend ./

EXPOSE 1234

CMD ["npm", "start"]
