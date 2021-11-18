import React from 'react'
import {Form, Input, Button, message} from 'antd'
import '../style/login.less'
import { api } from '../api'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/actions/userActions'
import { useHistory } from 'react-router-dom'

function Login() {
  const history = useHistory()
  const dispatch = useDispatch()
  const submit = async (data) => {
    const res = await api.login(data)
    if(!res.code) {
      dispatch(setUser(res.data))
      message.success('登录成功', 1, () => {
        history.push('/')
      })
    } else {
      message.error(res.msg, 1)
    }
  }
  const onFinish = (values) => {
    const data = {
      username: values.username,
      password: btoa(encodeURIComponent(values.password))
    }
    submit(data)
  }
  return (
    <div className="login-form">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        autoComplete="off"
        onFinish={onFinish} 
      >
        <Form.Item label="用户名" name="username">
          <Input placeholder="请输入用户名"/>
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input placeholder="密码"/>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login