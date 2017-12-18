const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

const port = 1234; //should match client's package.json proxy value
const BUILD_DIR = path.resolve(__dirname, './public');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// //serve static assets normally
app.use(express.static(BUILD_DIR, { index: false }));

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

// serve up static files
//app.use(express.static(__dirname,{index:false}))

app.get('*', function (req, res) {
    console.log(req.headers)
    res.sendFile(path.join(BUILD_DIR,'index.html'))
})

app.listen(port);

console.log("Listening internally on..." + port)


module.exports = app;
