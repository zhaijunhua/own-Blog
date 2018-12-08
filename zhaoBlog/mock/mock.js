var http = require('http');
// let util = require('util');
// http.get('http://nodejs.cn/index.json', (res) => {
//     const {statusCode} =res;
//     const contentType = res.headers['content-type'];
//     let data = ''; // 返回结果
//     res.on('data', function(chunk) {
//         data += chunk;
//     });
//     res.on('end', function() {  //检测结尾
//         let result = JSON.parse(data);  //打印书局
//         console.log('result'+util.inspect(result));

//     })

// });
http.get('http://nodejs.cn/index.json', (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error('请求失败\n' +
                      `状态码: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('非法的 content-type.\n' +
                      `期望的是 application/json 但接收到的是 ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    // 消费响应的数据以释放内存。
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`报错: ${e.message}`);
});