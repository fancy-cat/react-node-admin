import React from 'react';
import { Menu, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons';
const handleMenuClick = (e) => {
  
}
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">
      退出登录
    </Menu.Item>
  </Menu>
)
function mainHeader(props) {
  return (
    <div className="main-header">
      {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: props.toggleC
      })}
      <Dropdown overlay={menu} arrow={true} placement="bottomCenter" className="drop-user" trigger="click"><UserOutlined/></Dropdown>
    </div>
  )
}

export default mainHeader