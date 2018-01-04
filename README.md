# code-witch

## development
Local development requires between one and three processes running, depending on what you want to work on. These must be executed in succession. The React app uses webpack-dev-server with hot reloading.

1. Client only (ReactJS): `cd client && npm run dev`
2. Client and Backend (API): `cd client && npm run dev-build` `cd backend && npm run express`
3. Client, Backend and MongoDB: `cd backend && npm run mongo`

Note: ctrl-C (OSX) to terminate any of these processes

Local Docker development

1. `docker-compose build`
2. `docker-compose up`
3. To stop both services: `docker-compose stop`

## deployment

Push to the master branch. Docker Cloud will publish the `luna+cauldron` service automagically.

## todo

* Create a staging environment
* Add tests
* Check for poss. security issues
* Cleanup pre-mongo stuff
* Install SASS