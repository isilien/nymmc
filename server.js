const express = require('express');
const path = require('path');
const favicon = require('serve-favicon')

const SERVER_FILES = path.resolve(__dirname, 'backend');
const BUILD_DIR = path.resolve(__dirname, 'public');

const index = require(path.join(SERVER_FILES,'./routes/index'));
const blogs = require(path.join(SERVER_FILES, './routes/blogs'));

const app = express();

const PORT = 1234; //should match client's package.json proxy value

// view engine setup
app.set('views', path.join(SERVER_FILES, 'views'));
app.set('view engine', 'jade');

// //serve static assets normally
app.use(express.static(BUILD_DIR, { index: false }));


// Note: order matters here! First in list will take precedence.
app.use('/api/blogs', blogs);

app.use(favicon(path.join(BUILD_DIR, 'favicon.ico')))

app.get('*', function (req, res) {
    console.log(req.headers)
    res.sendFile(path.join(BUILD_DIR,'index.html'))
})

app.listen(PORT);

console.log("Listening internally on..." + PORT)

module.exports = app