# code-witch

## development
Local development requires between one and three processes running, depending on what you want to work on. These must be executed in succession. The React app uses webpack-dev-server with hot reloading.

1. Client only (ReactJS): `cd client && npm run dev`
2. Client and Backend (API): `cd client && npm run dev-build` `cd backend && npm run express`
3. Client, Backend and MongoDB: `cd backend && npm run mongo`

The webpack-dev-server is available at `localhost:5678`, the Express server can be accessed at `localhost:1324`.

Note: ctrl-C (OSX) to terminate any of these processes

Local Docker development

Docker Compose builds two services: `cauldron` and `luna`. `cauldron` is a vanilla MongoDB image, `luna` is the ReactJS client + Express backend. To run these locally, make a copy of `docker-compose.yml` named `docker-compose.override.yml` and change ln 4 in the new file to `build: .`. This will cause Docker Compose to build `luna` from scratch rather than pulling the latest image from the private Docker repo. Running Docker Compose locally with the `NODE_ENV` set to `development` causes Express to be unable to connect to MongoDB at the moment. 

1. `docker-compose build`
2. `docker-compose up`
3. To stop both services: `docker-compose stop` or ctrl-C (OSX)

## deployment

Push to the master branch. Docker Cloud will publish the `luna+cauldron` service automagically.

## todo

* Create a staging environment
* Add tests
* Check for poss. security issues
* Cleanup pre-mongo stuff
* Install SASS