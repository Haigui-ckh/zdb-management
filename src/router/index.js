import Vue from 'vue'
import Router from 'vue-router'
/* eslint-disable */
Vue.use(Router)

/* Layout */
import Layout from '@/layout/index'
import { title } from '@/settings'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */


export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },  
  // 首页重定向
  {
    path: '/',
    redirect: 'indexplatdata',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'indexplatdata',
        component: () => import('@/views/operate/PlatData'),
        name: 'indexplatdata',
        meta: { title: '平台数据', affix: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history'
  // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()


// 赋新router的matcher以达到动态删除路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// 异步挂载的路由，根据权限加载
export const asyncRoutes = [
  // 运营管理路由
  {
    path: '/operate',
    component: Layout,
    name: 'Operate',
    meta: {
      title: '运营管理',
      icon: 'nested',
      roles: ['admin']
    },
    children: [
      {
        path: 'platdata',
        component: () => import('@/views/operate/PlatData'),
        name: 'platdata',
        meta: {
          title: '平台数据',
          roles: ['admin']
        }
      },
      {
        path: 'storessummary',
        component: () => import('@/views/operate/StoreSummary'),
        name: 'merchantssummary',
        meta: {
          title: '商家汇总',
          roles: ['admin']
        }
      },
      {
        path: 'storesummary',
        component: () => import('@/views/operate/riderSummary'),
        name: 'ridersummary',
        meta: {
          title: '骑手汇总',
          roles: ['admin']
        }
      },
      {
        path: 'sitesummary',
        component: () => import('@/views/operate/SiteSummary'),
        name: 'sitesummary',
        meta: {
          title: '站点汇总',
          roles: ['admin']
        }
      },
      {
        path: 'usersummary',
        component: () => import('@/views/operate/UserSummary'),
        name: 'usersummary',
        meta: {
          title: '用户汇总',
          roles: ['admin']
        }
      },
      {
        path: 'deliverysummary',
        component: () => import('@/views/operate/DeliverySummary'),
        name: 'deliverySummary',
        meta: {
          title: '快递汇总',
          roles: ['admin']
        }
      },
      {
        path: 'takeoutsummary',
        component: () => import('@/views/operate/TakeOutSummary'),
        name: 'takeoutsummary',
        meta: {
          title: '外卖汇总',
          roles: ['admin']
        }
      },
      {
        path: 'announcement',
        component: () => import('@/views/operate/Announcement'),
        name: 'announcement',
        meta: {
          title: '平台公告',
          roles: ['admin']
        }
      },
    ]
  }, 
  // 财务管理路由
  {
    path: '/finance',
    component: Layout,
    name: 'finance',
    alwaysShow: true,
    meta: {
      title: '财务管理',
      icon: 'chart',
      roles: ['admin']
    },
    children: [
      {
        path: 'journal',
        component: () => import('@/views/finance/Journal'),
        name: 'journal',
        meta: {
          title: '平台收支',
          roles: ['admin']
        }
      }
    ]
  },
  // 校园应用路由
  {
    path: '/application',
    component: Layout,
    name: 'application',
    alwaysShow: true,
    meta: {
      title: '校园应用',
      icon: 'table',
      roles: ['admin']
    },
    children: [
      {
        path: 'appmall',
        component: () => import('@/views/application/AppMall'),
        name: 'appmall',
        meta: {
          title: '应用商城',
          roles: ['admin']
        }
      }
    ]
  },
  // 站点运营路由
  {
    path: '/stationoperate',
    component: Layout,
    name: 'stationoperate',
    alwaysShow: true,
    meta: {
      title: '站点运营',
      roles: ['station'],
      icon: 'nested',
    },
    children: [
      {
        path: 'customerservice',
        component: () => import('@/views/stationoperate/CustomerService'),
        name: 'customerservice',
        meta: {
          title: '客服消息',
          roles: ['station']
        }
      },
      {
        path: 'infosetting',
        component: () => import('@/views/stationoperate/StationInfoSetting'),
        name: 'infosetting',
        meta: {
          title: '站点信息设置',
          roles: ['station']
        }
      },
      {
        path: 'deliveryservice',
        component: () => import('@/views/stationoperate/DeliveryService'),
        name: 'deliveryservice',
        meta: {
          title: '快递服务',
          roles: ['station']
        }
      },
      {
        path: 'takeoutmall',
        component: () => import('@/views/stationoperate/TakeOutMall'),
        name: 'takeoutmall',
        meta: {
          title: '外卖商城',
          roles: ['station']
        }
      }
    ]
  },
  // 站点应用
  {
    path: '/stationapp',
    component: Layout,
    name: 'stationapp',
    alwaysShow: true,
    meta: {
      title: '校园应用',
      icon: 'table',
      roles: ['station']
    },
    children: [
      {
        path: 'stationappmall',
        component: () => import('@/views/stationapp/AppMall'),
        name: 'stationappmall',
        meta: {
          title: '应用商城',
          roles: ['station']
        }
      }
    ]
  },
  // 站点财务
  {
    path: '/stationfinance',
    component: Layout,
    name: 'stationfinance',
    alwaysShow: true,
    meta: {
      title: '财务管理',
      icon: 'chart',
      roles: ['station']
    },
    children: [
      {
        path: 'stationjournal',
        component: () => import('@/views/stationfinance/StationJournal'),
        name: 'stationjournal',
        meta: {
          title: '平台收支',
          roles: ['station']
        }
      }
    ]
  },
  // 站点管理系统
  {
    path: '/stationmanagement',
    component: Layout,
    name: 'stationmanagement',
    alwaysShow: true,
    meta: {
      title: '管理系统',
      icon: 'chart',
      roles: ['station']
    },
    children: [
      {
        path: 'staffmanagement',
        component: () => import('@/views/stationmanagement/StaffManagement'),
        name: 'staffmanagement',
        meta: {
          title: '人员管理',
          roles: ['station']
        }
      },
      {
        path: 'performancemanagement',
        component: () => import('@/views/stationmanagement/PerformanceManagement'),
        name: 'performancemanagement',
        meta: {
          title: '业绩管理',
          roles: ['station']
        }
      },
      {
        path: 'mallmanagement',
        component: () => import('@/views/stationmanagement/MallManagement'),
        name: 'mallmanagement',
        meta: {
          title: '商城管理',
          roles: ['station']
        }
      },
      {
        path: 'storemanagement',
        component: () => import('@/views/stationmanagement/StoreManagement'),
        name: 'storemanagement',
        meta: {
          title: '店铺审核',
          roles: ['station']
        }
      },
      {
        path: 'deliveryfeemanagement',
        component: () => import('@/views/stationmanagement/DeliveryFeeManagement'),
        name: 'deliveryfeemanagement',
        meta: {
          title: '配送费设置',
          roles: ['station']
        }
      },
      {
        path: 'reportmanagement',
        component: () => import('@/views/stationmanagement/ReportManagement'),
        name: 'reportmanagement',
        meta: {
          title: '举报商家',
          roles: ['station']
        }
      },
      {
        path: 'commentmanagement',
        component: () => import('@/views/stationmanagement/CommentManagement'),
        name: 'commentmanagement',
        meta: {
          title: '评论管理',
          roles: ['station']
        }
      },
      {
        path: 'usermanagement',
        component: () => import('@/views/stationmanagement/UserManagement'),
        name: 'usermanagement',
        meta: {
          title: '用户管理',
          roles: ['station']
        }
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]



export default router



// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465