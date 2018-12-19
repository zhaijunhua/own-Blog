var express = require('express'); // 依赖
var routers = express();
var mongoose = require('mongoose');
var Sentence = require('../models/sentences');


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

routers.get('/', function(req,res, next) {
    var cate = req.query.cate;
    // 进行判断
    var param = {};
    var cateNumber1 = '';
    if(cate != '0'){
        switch (cate) {
            case '1': cateNumber1= 1; break;
            case '2': cateNumber1= 2; break;
        }
        param = {
            category: cateNumber1
        }
        console.log(param);
    }
    Sentence.find(param, function(err, doc) {
        if(err) {
            res.json({
                status: 0,
                msg: err.message
            });
        } else {
            res.json({
                status: 1,
                mag: 'success GET',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
})

module.exports = routers;