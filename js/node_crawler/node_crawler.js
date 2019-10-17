//引入模块
let express = require('express');

//创建服务器
let app = express();

//get方法接受响应并返回响应数据
app.get('/',function(req,res){
    res.send("express中get方法返回的响应数据！");
});

//启动服务器
app.listen(3000,function(){
    console.log('服务启动，地址为：localhost:3000');
})