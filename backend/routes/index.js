var express = require('express');
var path = require('path');
var router = express.Router();
const INDEX_PATH = path.resolve(__dirname,'../public/index.html');

/* GET home page. */
router.get('*', function(req, res, next) {
    console.log(req)
    res.sendFile(INDEX_PATH)
});

module.exports = router;
