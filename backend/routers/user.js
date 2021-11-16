import express from 'express'
import User from '../models/userModel'

const router = express.Router()

router.post('/login', async (req, res) => {
  const user = new User(req.body)
  const resData = await user.save()
  if(resData) {
    res.end(JSON.stringify({
      code: 0,
      msg: '登录成功'
    }))
  } else {
    res.end(JSON.stringify({
      code: 100,
      msg: '登录失败'
    }))
  }
})
router.post('/loginOut', (req, res) => {

})

export default router