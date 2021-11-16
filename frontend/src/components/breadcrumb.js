import { Breadcrumb } from 'antd'
import { routerData } from '../router'
import { useLocation, Link} from 'react-router-dom'

function MyBreadCrumb() {
  const currentLocation = useLocation()
  const pathname = currentLocation.pathname
  const urlSplitList = pathname.split('/') // 比较局限 现在的路由都是一个'/' 加id的是俩'/'
  const routeItem = routerData.find(r => urlSplitList[1] === r.path.split('/')[1])
  const breadList = routeItem ? routeItem.breadList : []
  if(urlSplitList.length > 2 && breadList.length) {
    breadList.forEach(b => {
      if(b.path) {
        b.path = b.path.replace(/:id/, urlSplitList[urlSplitList.length-1])
      }
    })
  }
  return (
    <Breadcrumb style={{ margin: '16px 0'}}>
      {
        breadList.map((bread,idx) => <Breadcrumb.Item key={idx}>
          {
            bread.path ? <Link to={bread.path}>{bread.name}</Link> : bread.name
          }
        </Breadcrumb.Item>)
      }
    </Breadcrumb>
  )
}

export default MyBreadCrumb