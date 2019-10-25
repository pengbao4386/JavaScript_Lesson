//引入模块
let express = require('express');
let bodyParser = require('body-parser');
let multer  = require('multer');
let cookieParser = require('cookie-parser')
let util = require('util');
let fs = require("fs");


//创建服务器
let app = express();

// 创建 application/x-www-form-urlencoded 编码解析
let urlencodedParser = bodyParser.urlencoded({ extended: false });
// multer(opt)中间件,它基于busboy构建，可以高效的处理文件上传，但并不处理multipart/form-data之外的用户请求
// dest或storage - 文件存储位置
// fileFilter - 函数，控制可上传的文件类型
// limits - 上传数据限制(文件大小)
let updateFile =  multer({ dest: './tmp/'});

app.use(cookieParser());


// GET请求主页输出 "Hello Express"
app.get('/', function (req, res) {
    console.log('主页GET请求');
    res.send("Hello Express GET!");
    console.log("Cookies: " + util.inspect(req.cookies));
});

 //Express 提供了内置的中间件 express.static 来设置静态文件如：图片， CSS, JavaScript 等
 app.use('/public', express.static('public'));

 //c#winform调用服务
 app.get('/advtree',function(req,res){

     //获取get请求的查询参数
     console.log(req.query);

     let str = "";
     let count = 500000;
     for(i = 0; i < count; i++){
         
        if(i  == count-1){
            str += '\"value_'+i+'\"';
        }else{
            str += '\"value_'+i+'\",';
        }
     }
     console.log('调用服务: http://localhost:3000/advtree');
     res.send(str);
});

app.post('/advtreepost',function(req,res){

    //获取post请求的查询参数
    req.on('data',function(data){
		let obj=JSON.parse(data);
		console.log(obj);
    });
    
    let str = "";
    let count = 500000;
    for(i = 0; i < count; i++){
        
       if(i  == count-1){
           str += '\"value_'+i+'\"';
       }else{
           str += '\"value_'+i+'\",';
       }
    }
    console.log('调用服务: http://localhost:3000/advtree');
    res.send(str);
});

 //index.html服务实例
 app.get('/index.html',function(req,res){
     res.sendFile(__dirname + "/index.html");
 });

 //get方法
 app.get('/process_get',function(req,res){
    //设置response编码为utf-8,解决中文乱码问题
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    //输出json格式
    let response = {
        "first_name":req.query.first_name,  //req.query：获取URL的查询参数串
        "last_name":req.query.last_name
    };
    console.log(response);
    res.end("get方式收到传入参数：" + JSON.stringify(response));
 });

 //post方法
 app.post('/process_post', urlencodedParser, function (req, res) {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    // 输出 JSON 格式
    var response = {
        "first_name":req.body.first_name,
        "last_name":req.body.last_name
    };
    console.log(response);
    res.end("post方式收到传入参数：" + JSON.stringify(response));
 });

/*multer解析完上传文件后，会被保存为一个包含以下字段的对象：
    fieldname - 表单提交的文件名(input控件的name属性)
    originalname - 文件在用户设备中的原始名称
    encoding - 文件的编码类型
    mimetype - 文件的Mime类型
    size - 文件的大小
    destination - 文件的保存目录(DiskStorage)
    filename - 文件在destination中的名称(DiskStorage)
    path - 上传文件的全路径(DiskStorage)
    buffer - 文件对象的Buffer(MemoryStorage)*/
 //post方法上传文件
 app.post('/file_upload',updateFile.array('input_file'), function (req, res) {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});

    console.log(req.files[0]);  // 上传的文件信息
  
    let des_file = __dirname + "\\tmp\\" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
         fs.writeFile(des_file, data, function (err) {
          if( err ){
               console.log( err );
          }else{
                response = {
                    message:'File uploaded successfully', 
                    filename:req.files[0].originalname
               };
           }
           console.log( response );
           res.end( JSON.stringify( response ) );
        });
    });
 });

 //cookie管理
 

//启动服务器
let server = app.listen(3000, function () {
    let host = server.address().address;
    console.log(host);
    let port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})