var mongoose = require('mongoose'); // 引入数据库
var Schema = mongoose.Schema;

var sentencesSchema = new Schema({
    'sentenceId': Number,
    'sentenceContenet': String,
    'author': String,
    'readTime': String
},{
    collection: 'sentences'
});
module.exports = mongoose.model('Sentence', sentencesSchema);