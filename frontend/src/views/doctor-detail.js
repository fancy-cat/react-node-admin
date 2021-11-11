import React, { useEffect, useState } from 'react'
import {Card, Descriptions} from 'antd';
import { api } from '../api';
import {useParams} from 'react-router-dom'

function DoctorDetail() {
  const currentParams = useParams()
  const [info, setInfo] = useState({});
  const getDetail = async () => {
    const data = {
      id: currentParams.id
    }
    const res = await api.getDoctorDetail(data)
    if(!res.code) {
      setInfo(res.data.info)
    }
  }
  useEffect(() => {
    getDetail()
  },[])
  return <Card>
    <Descriptions title="医生信息">
      <Descriptions.Item label="姓名">{info.name}</Descriptions.Item>
      <Descriptions.Item label="医院">{info.hospital}</Descriptions.Item>
      <Descriptions.Item label="电话">{info.mobile}</Descriptions.Item>
      <Descriptions.Item label="科室">{info.department}</Descriptions.Item>
    </Descriptions>
  </Card>
}

export default DoctorDetail