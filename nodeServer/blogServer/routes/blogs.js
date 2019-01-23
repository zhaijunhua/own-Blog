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
router.get("/intro", function(req,res,next) {
    var page = req.param('page');
    let pageSize = parseInt(req.param('pageSize'));   // 下面的LIMIT必须是数字，在这里返回的是字符串，所以需要进行转换
    var sort = req.param('sort');   // 获取前端的参数
    let skip = (page-1) * pageSize;
    let params = {};
    let blogsList = Blog.find(params, 'blogTitle blogTime introduce category').skip(params).skip(skip).limit(pageSize);
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
                msg: 'success',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
});

// 实现分类
router.get("/classify", function(req,res,next) {
    let category = req.query.category;
    // var page = req.param('page');
    // let pageSize = parseInt(req.param('pageSize'));   // 下面的LIMIT必须是数字，在这里返回的是字符串，所以需要进行转换
    // let skip = (page-1) * pageSize;
    // let params = {};
    // 业务代码
    // 分类条件参数
    let param = {};
    let cate = '';
    if(category != '') {
        switch (category) { 
            case '1': cate = 'html'; break;
            case '2': cate = 'css'; break;
            case '3': cate = 'js'; break;
            case '4': cate = 'vue'; break;
            case '5': cate = 'react'; break;
            case '6': cate = 'node'; break;
            case '7': cate = 'other'; break;
        };
        param = {
            category: cate
        };
        console.log(param);
    }
    // 查找数据
    // let blogsList = Blog.find(param, 'blogTitle blogTime introduce category');
    Blog.find(param, 'blogTitle blogTime introduce category', function(err,doc) {
        if(err) {
            res.json({
                status: '00000',
                msg: err.message
            });
        } else {
            res.json({
                status: '10001',
                msg: 'success',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
});
router.post('/addBlog', function(req, res, next) {
    let newBlog = new Blog({
        blogTitle: req.body.blogTitle,
        category: req.body.category,
        introduce: req.body.introduce,
        blogContent: req.body.blogContent
    });
    newBlog.save(function(err, doc) {
        if(err) {
            return res.json({
                status: '00000',
                msg: err.message
            })
        }
        res.json({
            status: '10001',
            data: doc,
            msg: 'success'
        })
    });
});

router.get('/mainBlog',function(req, res, next) {
    var id = req.query.id;
    var objId = mongoose.Types.ObjectId(id);
    var param = {
        _id: objId
    };
    console.log(param);
    Blog.find(param, function(err, doc) {
        if(err) {
            res.json({
                status: '00000',
                msg: err.message
            });
        } else {
            res.json({
                status: '10001',
                msg: 'success',
                result: {
                    list: doc
                }
            })
        }
    })
});

router.post('/deleteBlog', function(req, res, next) {
    var id = req.body.id;
    var objId = mongoose.Types.ObjectId(id);
    var param = {
        _id: objId
    };
    Blog.findOneAndRemove(param, function(err, doc) {
        if(err) {
            res.json({
                status: '00000',
                msg: err.message,
            })
        } else {
            res.json({
                status: '10001',
                msg: 'delete success',
                result: doc
            })
        }
    })
});

router.post('/updateBlog', function(req, res, next) {
    let id = req.body.id;
    let blogId = mongoose.Types.ObjectId(id);
    let blogTitle = req.body.blogTitle;
    let blogContent = req.body.blogContent;
    let category = req.body.category;
    let introduce = req.body.introduce;
    let param = {
        _id: blogId
    };
    let data = {
        blogTitle: blogTitle,
        blogContent: blogContent,
        category: category,
        introduce: introduce
    }
    Blog.findOneAndUpdate(param, data, function(err, doc) {
        if(err) {
            res.json({
                status: '00000',
                msg: err.message,
                result: 'error'
            });
        } else {
            res.json({
                status: '10001',
                message: 'success',
                result: doc
            });
        }
    });
});
module.exports = router; // 必须进行输出

