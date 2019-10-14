let xlsx = require('node-xlsx');
let path = require('path');
let fs = require('fs');

let sourceFilePath = path.join(__dirname, "../../data/gwy.xls");
let resultFilePath = path.join(__dirname, "../../data/result.txt");

let sheets = xlsx.parse(sourceFilePath);

//判断文件是否存在，如果存在则删除文件；
if (fs.existsSync(resultFilePath)) {
    //文件存在，移除TXT文件
    fs.unlink(resultFilePath, function (err) {
        if (err) throw err;
    });
    console.log('==========已删除存在的结果文件=========');
}

/*sheets是一个数组，数组中的每一项对应excel这个文件里的多个表格
如sheets[0]对应excel里Sheet1这个表格，sheets[1]对应Sheet2这个表格*/
sheets.forEach(function (sheet) {
    //sheet是一个json对象，格式为{name:"sheet名称",data:[]},我们想要的数据就存储在data里
    for (let i = 2; i < sheet["data"].length; i++) { //excel文件里的表格一般有标题所以不一定从0开始
        let row = sheet['data'][i];
        if (row && row.length > 0) {
            if (row[12].indexOf('教育学') != -1 &&
                row[13].indexOf('硕士') != -1
                // && row[16].indexOf('无限制') != -1 
                &&
                row[17].indexOf('无限制') != -1 &&
                row[20].indexOf('北京') != -1) {
                //将查询结果写入TXT文件中
                console.log("准备写入文件..................");
                fs.appendFileSync(resultFilePath, '\n' + row + '\n');
                // console.log(row);
            }
        }
    }
    console.log('该sheet表内容检索结束！');
});