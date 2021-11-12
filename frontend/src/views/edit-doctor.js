import React from "react"
import { Button, Card, Form, Input, InputNumber } from "antd"
import { api } from "../api"

function EditDoctor() {
  const submit = async (data) => {
    const res = await api.editDoctorInfo(data)
    if(!res.code) {
      console.log('提交成功')
    }
  }
  const onFinish = (values) => {
    console.log(values)
    submit(values)
  }
  return (
    <Card>
      <Form 
        onFinish={onFinish}
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