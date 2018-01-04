const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const PORT = 1234; //should match client's package.json proxy value
const PRODUCTION = process.env.NODE_ENV === 'production';
const MONGO_SERVICE_NAME = 'cauldron';

const SERVER_FILES = path.resolve(__dirname);
const BUILD_DIR = path.resolve(__dirname, 'public');
const BLOGS = require(path.join(SERVER_FILES, 'routes/blogs'));

const app = express();

// serve static assets normally
app.use(express.static(BUILD_DIR, { index: false }));

// Note: order matters here! First in list will take precedence.
app.use('/api/blogs', BLOGS);

app.get('*', function (req, res) {
    console.log(req.headers)
    res.sendFile(path.join(BUILD_DIR,'index.html'))
})

app.listen(PORT);

console.log("Listening on..." + PORT)

const serviceOrHostname = PRODUCTION ? MONGO_SERVICE_NAME : 'localhost:27017';
const dbName = MONGO_SERVICE_NAME;
const url = `mongodb://${serviceOrHostname}`

// See if the MongoDB service is live
MongoClient.connect(url, function (err, client) {
    if (err === null) {
        console.log(`Connected successfully to ${dbName}`);
        const db = client.db(dbName);
        client.close();
    } else {
        console.error(err)
    }
});

module.exports = app