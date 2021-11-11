import Axios from 'axios'

Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const instance = Axios.create({
  // baseURL: 'http://dev-dtbox.suiren.com/dtbox/backend/',
  baseURL: 'http://localhost:3000',
  timeout: 30000
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let tk = localStorage.getItem('react-demo-tk')
  if(tk) {
    config.headers.Authorization = tk;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export const get = (options) => {
  return new Promise((resolve, reject) => {
    instance.get(options.url, {
      params: options.data
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export const post = (options) => {
  return new Promise((resolve, reject) => {
    instance.post(options.url, options.data).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}