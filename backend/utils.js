import jwt from 'jsonwebtoken'

export const formDataRes = (code, data, msg) => {
  // 响应体封装
  return {
    code,
    data,
    msg
  }
}
const secretKey = 'private_key' // 随便写的
// 生成tk
export const generateToken = (payload) => {
  // expiresIn 过期时间 60 * 60 = '1h'
  return jwt.sign(payload,secretKey,{ expiresIn: 60 * 60 })
}

// 验证tk
export const verifyToken = (tk) => {
  return jwt.verify(tk, secretKey, function (err, decoded) {
    if (err) {
      return 1 // 失败
    } else {
      return 0 // 成功
    }
  })
}

