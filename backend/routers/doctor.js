import express from 'express'
import Doctor from '../models/doctorModel';
import Id from '../models/idModel'
import { formDataRes } from '../utils';
var router = express.Router()

// 医生列表查询
router.get('/getDoctorPage', (req, res) => { 
  Doctor.find((err, docs) => {
    const resData = formDataRes(0, {
      list: docs
    })
    // res.end 返回的文件 must be one of type string or Buffer
    // res.send 返回的文件 JSON Obj array string or Buffer 都可
    res.send(resData)
  })
})
// 查询单个医生信息
router.get('/detail', async (req, res) => { 
  const item = await Doctor.findOne({id: req.query.id})
  if(item) {
    const resData = formDataRes(0, item)
    res.send(resData)
  } else {
    res.send(formDataRes(100, {}, '查询失败'))
  }
})
// 添加医生
router.post('/add', async (req, res) => {
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
      res.send(formDataRes(0, {
        id: doctorId.id
      }, '成功'))
    }
  })
})
// 删除医生
router.get('/delete', async (req, res) => {
  const query = {
    id: req.query.id
  }
  const resData = await Doctor.deleteOne(query)
  if(resData.deletedCount) {
    res.send(formDataRes(0, {}, '成功'))
  } else {
    res.send(formDataRes(100, {}, '失败'))
  }
})
// 修改医生
router.post('/update', async (req, res) => {
  const reqData = req.body
  const query = {
    id: reqData.id
  }
  const update = {$set: reqData}
  const resData = await Doctor.findOneAndUpdate(query, update)
  if(resData) {
    res.send(formDataRes(0, {}, '成功'))
  } else {
    res.send(formDataRes(100, {}, '失败'))
  }
})

export default router
