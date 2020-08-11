var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Aquí se requieren los archivos de rutas

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const productAddRouter = require('./routes/productAdd');
const productCartRouter = require('./routes/productCart');
const productDetail = require('./routes/productDetail');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// RUTAS

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoriesRouter);
app.use('/addproduct', productAddRouter); //Ruta provisoria, se deberá verificar si es parte de otra ruta que pase primero por la validación de tipo de usuario.
app.use('/cart', productCartRouter);
app.use('/detail', productDetail);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
