import { get, post } from '../http'

export const api = {
  login(data) {
    return post({
      url: '/user/login',
      data
    })
  },
  loginOut(data) {
    return post({
      url: '/user/loginOut',
      data
    })
  },
  getDoctorPage(data) {
    return get({
      url: '/doctor/getDoctorPage',
      data
    })
  },
  updateDoctor(data) {
    return post({
      url: '/doctor/update',
      data
    })
  },
  addDoctor(data) {
    return post({
      url: '/doctor/add',
      data
    })
  },
  getDoctorDetail(data) {
    return get({
      url: '/doctor/detail',
      data
    })
  },
  deleteDoctor(data) {
    return get({
      url: '/doctor/delete',
      data
    })
  }
}