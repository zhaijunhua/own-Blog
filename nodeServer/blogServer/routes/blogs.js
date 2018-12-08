var express = require('express');
var router = express();  //获取路由
var mongoose = require('mongoose');
var Blog = require('../models/blogs');

// 连接数据库
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

//实现路由,next 继续往后执行
router.get("/", function(req,res,next) {
    // 业务代码
    // 查找数据
    Blog.find({}, function(err,doc) {
        if(err) {
            res.json({
                status: '0',
                msg: err.message
            });
        } else {
            res.json({
                status: '1',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
});

module.exports = router; // 必须进行输出

