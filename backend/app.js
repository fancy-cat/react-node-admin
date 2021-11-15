import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import Doctor from './models/doctorModel';
import Id from './models/idModel'

// mongodb 数据库
const mongodbUrl = 'mongodb://localhost/test'
const port = 3000
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

// post参数处理
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


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
app.post('/doctor/editDoctor', async (req, res) => {
  // 获取自增长id
  const query = {name: 'doctor'}
  const update = {$inc: {id: 1}}
  const options = {new: true}
  const doctorId = await Id.findOneAndUpdate(query, update, options)
  // 插入doctor数据
  const reqData = req.body
  reqData.id = doctorId.id
  const doctor = new Doctor(reqData)
  doctor.save((err) => {
    if(!err) {
      res.end(JSON.stringify({
        code: 0,
        msg: '成功'
      }))
    }
  })
})

// 删除医生
app.get('/doctor/delete', async (req, res) => {
  const query = {
    id: req.query.id
  }
  const resData = await Doctor.deleteOne(query)
  if(resData.deletedCount) {
    res.end(JSON.stringify({
      code: 0,
      msg: '成功'
    }))
  } else {
    res.end(JSON.stringify({
      code: 100,
      msg: '失败'
    }))
  }
})

app.listen(port, () => {
  console.log(`app listen at http://localhost:${port}`)
})