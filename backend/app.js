import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import doctorRouter from './routers/doctor'
import userRouter from './routers/user'
import { verifyToken } from './utils'
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

// post参数处理
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// 所有请求的全局处理
app.all("*", (req, res, next) => {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","http://localhost:3001");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type, Authorization");
  res.header("Content-Type", "application/json")
  next()
})

app.use('/user', userRouter)
// ------- 上面的router不需要鉴权
app.use('/*', (req, res, next) => {
  // 验证token authorization小写开头
  const verifyResult = verifyToken(req.headers.authorization)
  if(verifyResult) {
    res.send({
      code: 404,
      msg: 'token无效'
    })
  } else {
    next()
  }
})
// ------- 下面的router需要鉴权
app.use('/doctor', doctorRouter)

app.listen(port, () => {
  console.log(`app listen at http://localhost:${port}`)
})