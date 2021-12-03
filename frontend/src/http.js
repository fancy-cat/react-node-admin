import Axios from 'axios'
import store from './redux/store'
import { message } from 'antd';

Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const instance = Axios.create({
  // baseURL: 'http://dev-dtbox.suiren.com/dtbox/backend/',
  baseURL: 'http://localhost:3000',
  timeout: 30000
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const tk = store.getState().userInfo.tk
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
  if(response.data.code) {
    switch(response.data.code) {
      case 404:
        // token无效，返回登录页面
        message.error(response.data.msg, 1, () => {
          // 除了location.href做跳转，暂时没有找到更好的办法 
          window.location.href = '/login'
        })
        break
      default:
        message.error(response.data.msg)
    }
  }
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