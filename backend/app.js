const fs = require('fs');
var path = require("path")
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const port = 3000
import Doctor from './models/doctorModel';
// mongodb 数据库
const mongoose = require('mongoose');
const mongodbUrl = 'mongodb://localhost/test'
mongoose.connect(mongodbUrl, {
  useNewUrlParser:true,
  useUnifiedTopology: true
})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('数据库连接成功')
});

// 响应体封装
function formDataRes(code, data) {
  return JSON.stringify({
    code,
    data
  })
}

// 所有请求的全局处理
app.all("*", (req, res, next) => {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","http://localhost:3001");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  res.header("Content-Type", "application/json")
  next()
})

// 医生列表查询
app.get('/doctor/getDoctorPage', (req, res) => { 
  Doctor.find((err, docs) => {
    const resData = formDataRes(0, {
      list: docs
    })
    // 返回的文件 must be one of type string or Buffer
    res.end(resData)
  })
})

// 添加医生
app.post('/doctor/editDoctor', (req, res) => {
  const doctor = new Doctor(req.body)
  doctor.save((err) => {
    if(!err) {
      res.end(JSON.stringify({
        code: 0,
        msg: '成功'
      }))
    }
  })
})
app.listen(port, () => {
  console.log(`app listen at http://localhost:${port}`)
})