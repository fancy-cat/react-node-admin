import './App.less';
import React, { useState } from 'react';
import { ConfigProvider, Layout, Menu, Breadcrumb } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { BrowserRouter as Router,Switch, Route, Link } from 'react-router-dom'
import { createBrowserHistory } from "history";
import { menuData, routerData } from './router'
import Doctor from './views/doctor'
import MainHeader from './components/header';
import Login from './views/login'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  // 登录判断
  // 获取当前路由 修改默认展开菜单(刷新后保持当前路由)
  const history = createBrowserHistory()
  let openKey = ''
  let selectKey = ''
  menuData.forEach(sm => {
    const m = sm.children.find(v => v.lightPath.includes(history.location.pathname))
    if(m) {
      openKey = sm.key
      selectKey = m.path
    }
  })
  const defaultOK = openKey ? openKey : 'sub1';
  const defaultSK = selectKey ? selectKey : '/doctor';

  // 折叠触发器
  const [collapsed, setCollapsed] = useState(false);
  const toggleC = () => {
    setCollapsed(!collapsed)
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        {history.location.pathname === '/login' ? 
          <Route path="/login"><Login/></Route> :
          <Layout style={{ minHeight: '100vh' }}>
            <Sider 
              collapsed={collapsed}
            >
              <div className="logo">{collapsed ? "" : "后台DEMO"}</div>
              <Menu 
                theme="dark"
                defaultOpenKeys={[defaultOK]} 
                defaultSelectedKeys={[defaultSK]}
                mode="inline"
              >
                {
                  menuData.map(subM => (
                    <SubMenu key={subM.key} icon={subM.icon} title={subM.name}>
                      {
                        subM.children && subM.children.length > 0 ? (
                          subM.children.map(sub => (
                          <Menu.Item key={sub.path}>
                            <Link to={sub.path}>{sub.name}</Link>
                          </Menu.Item>
                          ))
                        ) : ''
                      }
                    </SubMenu>
                  ))
                }
              </Menu>
            </Sider>
          <Layout className="site-layout">
            <Header style={{ padding: 0, background: '#fff' }}>
              <MainHeader collapsed={collapsed} toggleC={toggleC}/>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0'}}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-background" style={{ minHeight: 360 }}>
              <Switch>
                  {
                    routerData.map((r) => (
                      <Route path={r.path} key={r.path}>
                        {r.component}
                      </Route>
                    ))
                  }
                  {/* / 放在最后面, 因为其他路由没有加exact（严格匹配）会模糊匹配到它 */}
                  <Route path="/">
                    <Doctor/>
                  </Route>
              </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>解释权归宝儿姐所有</Footer>
          </Layout>
        </Layout>
        }
      </Router>
    </ConfigProvider>
  );
}
export default App;
