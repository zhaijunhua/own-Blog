// let user = require('./user');

let http = require('http');
const url = require('url');   //获取地址
let util = require('util'); //调制模式
let fs = require('fs');

let server = http.createServer((req, res) => {
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain;charset=utf-8');    // 设置响应
    var pathname = url.parse(req.url).pathname;
    console.log('file'+ pathname.substring(1));
    fs.readFile(pathname.substring(1), function(err, data) {
        if(err) {
            res.writeHead(404, {'Content-Type':'text/html'});
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data.toString());
        }      
        res.end();
    });
});
server.listen(3000,'127.0.0.1', () => {
    console.log('服务器运行,请打开3000端口');
});