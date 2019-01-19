var express = require('express');
var router = express();  //获取路由
var mongoose = require('mongoose');
var User = require('../models/users');
mongoose.connect('mongodb://127.0.0.1:27017/blogs');

mongoose.connection.on("connected", function() {
    console.log("MongoDB Connect Success");
});

mongoose.connection.on("error", function() {
    console.log("MongoDB connect Filed");
})
mongoose.connection.on("disconnected", function() {
    console.log("MongoDB connect disconnected");
});
// 登录接口
router.post('/login',function(req,res,next){
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(param, function(err,doc) {
    if(err) {
      res.json({  // 报错
          status: '1',
          msg: err.message  // 直接报错
        });
    } else {
      res.cookie('userId', doc.userId, {
        signed: true, // 加密
        path: '/',  // 将登陆获取的值=cookie值保存
        maxAge: 1000*60*60 // cookie保存时间,这里是一个小时
      });
      console.log(req.headers.cookie);
      // req.session.user = doc; // session可以实时拿到用户信息
      if(doc) { // 使用cookie
        res.json({
          status: '0',
          msg: '',
          result: doc.userName
        });
      }
    }
  })
});
// 登出接口
router.post('/logout', function(req, res, next) {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  });
  res.json({
    status: '0',
    mas: '',
    result: ''
  });
});
module.exports = router;