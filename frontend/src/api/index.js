import { get, post } from '../http'

export const api = {
  login(data) {
    return post({
      url: '/user/login',
      data
    })
  },
  getDoctorPage(data) {
    return get({
      url: '/doctor/getDoctorPage',
      data
    })
  },
  getDoctorDetail(data) {
    return get({
      url: '/doctor/detail',
      data
    })
  }
}