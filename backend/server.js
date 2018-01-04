const express = require('express');
const path = require('path');
const favicon = require('serve-favicon')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const SERVER_FILES = path.resolve(__dirname);
const BUILD_DIR = path.resolve(__dirname, 'public');

const index = require(path.join(SERVER_FILES,'routes/index'));
const blogs = require(path.join(SERVER_FILES, 'routes/blogs'));

const app = express();
const PORT = 1234; //should match client's package.json proxy value
const PRODUCTION = process.env.NODE_ENV !== 'development';
const MONGO_SERVICE_NAME = 'cauldron'

// serve static assets normally
app.use(express.static(BUILD_DIR, { index: false }));

// Note: order matters here! First in list will take precedence.
app.use('/api/blogs', blogs);

//May not be necessary?
//app.use(favicon(path.join(BUILD_DIR, 'favicon.ico')))

app.get('*', function (req, res) {
    console.log(req.headers)
    res.sendFile(path.join(BUILD_DIR,'index.html'))
})

app.listen(PORT);

console.log("Listening internally on..." + PORT)

const serviceOrHostname = PRODUCTION ? MONGO_SERVICE_NAME : 'localhost:27017';
const dbName = PRODUCTION ? MONGO_SERVICE_NAME : 'local-mongo';
const url = `mongodb://${serviceOrHostname}`

// See if the MongoDB service is live
MongoClient.connect(url, function (err, client) {
    if (err === null) {
        console.log(`Connected successfully to ${dbName}`);
        const db = client.db(dbName);
        client.close();
    } else {
        console.log(err)
    }
});

module.exports = app