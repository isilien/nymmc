const express = require('express');
const path = require('path');

const SERVER_FILES = path.resolve(__dirname, 'backend');
const BUILD_DIR = path.resolve(__dirname, 'public');

const index = require(path.join(SERVER_FILES,'./routes/index'));
const blogs = require(path.join(SERVER_FILES, './routes/blogs'));

const app = express();

const PORT = 1234; //should match client's package.json proxy value

console.log('args passed to server:',process.argv.length)

// view engine setup
app.set('views', path.join(SERVER_FILES, 'views'));
app.set('view engine', 'jade');

// //serve static assets normally
app.use(express.static(BUILD_DIR, { index: false }));

// Note: order matters here! First in list will take precedence.
app.use('/api/blogs', blogs);
//app.use('*', index)

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//     console.log('request:',req)
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// serve up static files
//app.use(express.static(__dirname,{index:false}))

app.get('*', function (req, res) {
    console.log(req.headers)
    res.sendFile(path.join(BUILD_DIR,'index.html'))
})

app.listen(PORT);

console.log("Listening internally on..." + PORT)

module.exports = app