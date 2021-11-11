import {
  MedicineBoxOutlined,
  UserOutlined,
  ControlOutlined,
  FileTextOutlined
} from '@ant-design/icons';

import Doctor from './views/doctor'
import Medicine from './views/medicine'
import Schedule from './views/schedule'
import Audit from './views/audit'
import Agreement from './views/agreement'
import DoctorDetail from './views/doctor-detail'

// menuData
// lightPath 作用是高亮左侧菜单
export const menuData = [
  {
    name: '医生',
    key: 'sub1',
    icon: <UserOutlined />,
    children: [
      {
        name: '医生管理',
        path: '/doctor',
        lightPath: ['/doctor', 'doctor-detail'],
      }
    ]
  },
  {
    name: '数字药',
    key: 'sub2',
    icon: <MedicineBoxOutlined />,
    children: [
      {
        name: '药物管理',
        path: '/medicine',
        lightPath: ['/medicine', '/detail'],
      }
    ]
  },
  {
    name: '方案',
    key: 'sub3',
    icon: <FileTextOutlined />,
    children: [
      {
        name: '方案管理',
        path: '/schedule',
        lightPath: ['/schedule'],
      },
      {
        name: '处方审核',
        path: '/audit',
        lightPath: ['/audit'],
      }
    ]
  },
  {
    name: '运营',
    key: 'sub4',
    icon: <ControlOutlined />,
    children: [
      {
        name: '协议',
        path: '/user-agreement',
        lightPath: ['/user-agreement'],
      }
    ]
  },
]

export const routerData = [
  {
    path: '/doctor',
    component: <Doctor/>,
  },
  {
    path: '/medicine',
    component: <Medicine/>,
  },
  {
    path: '/schedule',
    component: <Schedule/>,
  },
  {
    path: '/audit',
    component: <Audit/>,
  },
  {
    path: '/agreement',
    component: <Agreement/>,
  },
  {
    path: '/doctor-detail/:id',
    component: <DoctorDetail/>,
  }
]