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
    var page = req.param('page');
    let pageSize = parseInt(req.param('pageSize'));   // 下面的LIMIT必须是数字，在这里返回的是字符串，所以需要进行转换
    var sort = req.param('sort');   // 获取前端的参数
    let skip = (page-1) * pageSize;
    let params = {};
    let blogsList = Blog.find(params).skip(params).skip(skip).limit(pageSize);
    blogsList.sort({'blogId': sort});  // 1是升序，-1是降序
    // 业务代码
    // 查找数据
    blogsList.exec({}, function(err,doc) {
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

