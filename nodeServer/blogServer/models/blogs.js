var mongoose = require('mongoose'); // 引入数据库
var Schema = mongoose.Schema;

var blogMessageSchema = new Schema({
    "blogId": Number,
    "blogTitle": String,
    "blogTime": String,
    "blogContent": String
}, {
    collection: 'blogMessage'
});
module.exports = mongoose.model('Blog', blogMessageSchema);
