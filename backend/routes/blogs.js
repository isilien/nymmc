const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser')

const app = express()
// create application/json parser
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })


const PRODUCTION = process.env.NODE_ENV !== 'development';
const CONTENT_PATH = path.resolve(__dirname, '../content');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const serviceOrHostname = PRODUCTION ? MONGO_SERVICE_NAME : 'localhost:27017';
const dbName = PRODUCTION ? MONGO_SERVICE_NAME : 'local-mongo';
const url = `mongodb://${serviceOrHostname}`

// ROUTE: Post a blog
router.post('*', jsonParser, function (req, res, next) {
    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, client) {
        if (err) return next(err);
        const db = client.db(dbName)
        var collection = db.collection('blogs');
        collection.insertMany(req.body, function (err, result) {
            console.log(req.body, err ? err : result)
            return res.json({ result: result});
        });
    });
});

// ROUTE: Get all the blogs
router.get('*', function (req, res, next) {
    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, client) {
        if (err) return next(err);
        const db = client.db(dbName)
        var collection = db.collection('blogs');
        collection.find({}).toArray(function (err, docs) {
            if (err) return next(err);
            return res.json(docs);
        });
       // client.close();
    });
});


module.exports = router;
