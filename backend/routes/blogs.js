var express = require('express');
var path = require('path');
var router = express.Router();
const CONTENT_PATH = path.resolve(__dirname, '../content');

// Serve a blog's content
router.get('*', function(req, res, next) {
    path.resolve(CONTENT_PATH,req.headers.content)
    res.sendFile(path.resolve(CONTENT_PATH, req.headers.content+'.json'))
});

module.exports = router;
