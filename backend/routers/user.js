import express from 'express'
import User from '../models/userModel'
import { formDataRes, generateToken } from '../utils'

const router = express.Router()

router.post('/login', async (req, res) => {
  const user = new User(req.body)
  const resData = await user.save()
  const tk = generateToken(req.body) // 生成token
  if(resData) {
    res.end(formDataRes(0, {tk, ...req.body}, '登录成功'))
  } else {
    res.end(formDataRes(100, {}, '登录失败'))
  }
})
router.post('/loginOut', (req, res) => {
  
})

export default router