var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

const port = 1234; //should match client's package.json proxy value
const BUILD_DIR = path.resolve(__dirname, 'public');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// //serve static assets normally
 app.use(express.static(BUILD_DIR));

// // Note: order matters here! First in list will take precedence.
// //app.use('/api/users', users);
// //app.use('*', index)

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


var path = require('path')

// serve up static files
//app.use(express.static(__dirname,{index:false}))

// everything else gets index.html
app.get('/*', function (req, res) {
    console.log(req.headers)
    var index = path.resolve(__dirname, 'index.html');
    res.sendFile(index)
})

app.listen(port);

console.log("Listening on..." + port)


module.exports = app;
