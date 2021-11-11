const fs = require('fs');
var path = require("path")
const express = require('express')
const app = express()
const port = 3000

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
  // res.header("Access-Control-Allow-Headers","content-type");
  res.header("Content-Type", "application/json")
  next()
})
// app.get('/', (req, res) => {
//   console.log(req)
//   res.send('Hello world')
// })

// 医生列表
app.get('/doctor/getDoctorPage', (req, res) => {
  const list = fs.readFileSync(path.resolve(__dirname, './data/doctor.json'), 'utf8')
  const resData = formDataRes(0, {
    list: JSON.parse(list)
  })
  // 返回的文件 must be one of type string or Buffer
  res.end(resData)
})

// 医生详情
app.get('/doctor/detail', (req, res) => {
  let queryData = req.query
  const list = fs.readFileSync(path.resolve(__dirname, './data/doctor.json'), 'utf8')
  const target = JSON.parse(list).find(v => v.id == queryData.id)
  const resData = formDataRes(0, {
    info: target
  })
  res.end(resData)
})

app.listen(port, () => {
  console.log(`app listen at http://localhost:${port}`)
})