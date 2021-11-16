import React, { useEffect, useState } from "react"
import { Button, Card, Form, Input, InputNumber, message } from "antd"
import {useParams, useHistory} from 'react-router-dom'
import { api } from "../api"

function EditDoctor() {
  const [form] = Form.useForm();
  const history = useHistory()
  const currentParams = useParams()
  const id = currentParams.id;
  const getDetail = async (isUnMount) => {
    const data = {
      id
    }
    const res = await api.getDoctorDetail(data)
    if(!res.code && !isUnMount) {
      form.setFieldsValue(res.data)
    }
  }
  const submit = async (data) => {
    data.id = id ? id : undefined
    const apiName = id ? 'updateDoctor' : 'addDoctor'
    const res = await api[apiName](data)
    if(!res.code) {
      message.success('提交成功', 1, () => {
        history.push('/doctor')
      })
    }
  }
  const onFinish = (values) => {
    submit(values)
  }
  useEffect(() => {
    let isUnMount = false
    if(id) {
      getDetail(isUnMount)
    }
    return () => isUnMount = true
  }, [id])
  return (
    <Card>
      <Form 
        onFinish={onFinish}
        form={form}
      >
        <Form.Item label="姓名" name="name">
          <Input/>
        </Form.Item>
        <Form.Item label="年龄" name="age">
          <InputNumber/>
        </Form.Item>
        <Form.Item label="医院" name="hospital">
          <Input/>
        </Form.Item>
        <Form.Item label="科室" name="department">
          <Input/>
        </Form.Item>
        <Form.Item label="电话" name="mobile">
          <Input/>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">提交</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default EditDoctor