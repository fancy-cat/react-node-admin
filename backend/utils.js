export const formDataRes = (code, data, msg) => {
  // 响应体封装
  return JSON.stringify({
    code,
    data,
    msg
  })
}