var createError = require('http-errors');
var express = require('express'); // 依赖框架
var path = require('path'); // path路径
var cookieParser = require('cookie-parser');  // 获取信息进行转换
var logger = require('morgan');

var indexRouter = require('./routes/index');  // 加载路由
var usersRouter = require('./routes/users');  //图标
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());  // 对返回值进行转换，转为json格式
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 连接变量，

// 访问路由是进行相应的加载
app.use('/', indexRouter);
app.use('/users', usersRouter); // 加载users模块的路由进行设置

// catch 404 and forward to error handler，全局对404状态的拦截
app.use(function(req, res, next) {
  next(createError(404));   // 在404之后机会error
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
