import React from 'react'
import { Card } from 'antd';
import '../style/search-wrap.less'

function FormWrap(props) {
  return (
    <Card>
      <div className="card-form">
        <div className="form-data">{props.dataFrom}</div>
        <div className="handle-btn">{props.handleBtn}</div>
      </div>
    </Card>
  )
}

export default FormWrap