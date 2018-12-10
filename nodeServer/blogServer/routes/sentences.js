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
    Sentence.find({}, function(err, doc) {
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