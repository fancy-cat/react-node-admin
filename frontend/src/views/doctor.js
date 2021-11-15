import React, {useEffect, useState} from 'react'
import FormWrap from '../components/search-wrap'
import { Form, Input, Button, Card, Table } from 'antd';
import {Link} from 'react-router-dom'
// import { useLocation } from 'react-router-dom'
import { api } from '../api';

function Doctor() {
  const columns = [{
    title: '医生ID',
    dataIndex: 'id',
  }, {
    title: '姓名',
    dataIndex: 'name',
  }, {
    title: '手机号',
    dataIndex: 'mobile',
  }, {
    title: '医院',
    dataIndex: 'hospital',
  }, {
    title: '科室',
    dataIndex: 'department',
  }, {
    title: '操作',
    key: 'detail',
    render: (text, record) => {
      return <>
        <Button>
          <Link to={`/doctor-detail/${record.id}`}>详情</Link>
        </Button>
        <Button style={{marginLeft: '10px'}}>
          <Link to={`/update-doctor/${record.id}`}>编辑</Link>
        </Button>
        <Button type="danger" style={{marginLeft: '10px'}} onClick={() => deleteDoctor(record)}>delete</Button>
      </>
    }
  }]
  const getDoctor = async () => {
    const data = {
      keyword: keyword
    }
    const res = await api.getDoctorPage(data)
    if(!res.code) {
      res.data.list.forEach(v => v.key = v.id)
      setList(res.data.list)
    }
  }
  const deleteDoctor = async (record) => {
    const data = {
      id: record.id
    }
    const res = await api.deleteDoctor(data)
    if(!res.code) {
      getDoctor()
    }
  }
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState('');

  const HandleBtn = (
    <>
      <Button onClick={getDoctor} type="primary">search</Button>
      <Button onClick={getDoctor} type="ghost" style={{marginLeft: '10px'}}>
        <Link to="/add-doctor">add</Link>
      </Button>
    </>
  )
  // useEffect 相当于 componentDidMount 和 componentDidUpdate 、componentWillUnmount 的 组合
  useEffect(() => {
    getDoctor()
  },[])
  const onKeywordChange = (e) => {
    setKeyword(e.target.value)
  }
  const DataFrom = (
    <>
      <Form layout="inline">
        <Form.Item label="关键字">
          <Input placeholder="Basic usage" style={{ width: 200 }} value={keyword} onChange={onKeywordChange}/>
        </Form.Item>
      </Form>
    </>
  )
  
  return <div>
    <FormWrap 
      dataFrom={DataFrom} 
      handleBtn={HandleBtn}
    ></FormWrap>
    <Card style={{marginTop: '16px'}}>
      <Table 
        columns={columns} 
        dataSource={list} 
        pagination={{
          position: ['bottomCenter'], 
          showTotal: (total) => `共${total}条`, 
          showSizeChanger: true 
        }} />
    </Card>
  </div>
}

export default Doctor