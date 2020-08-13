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
    redirect: 'platdata',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'platdata',
        component: () => import('@/views/operate/PlatData'),
        name: 'platdata',
        meta: { title: '平台数据', affix: true }
      }
    ]
  },
  // 运营管理路由
  // {
  //   path: '/operate',
  //   component: Layout,
  //   name: 'Operate',
  //   meta: {
  //     title: '运营管理',
  //     icon: 'nested',
  //     role: ['master']
  //   },
  //   children: [
  //     {
  //       path: 'platdata',
  //       component: () => import('@/views/operate/PlatData'),
  //       name: 'platdata',
  //       meta: {
  //         title: '平台数据',
  //         role: ['master']
  //       }
  //     },
  //     {
  //       path: 'storessummary',
  //       component: () => import('@/views/operate/StoreSummary'),
  //       name: 'merchantssummary',
  //       meta: {
  //         title: '商家汇总',
  //         role: ['master']
  //       }
  //     },
  //     {
  //       path: 'storesummary',
  //       component: () => import('@/views/operate/riderSummary'),
  //       name: 'ridersummary',
  //       meta: {
  //         title: '骑手汇总',
  //         role: ['master']
  //       }
  //     },
  //     {
  //       path: 'sitesummary',
  //       component: () => import('@/views/operate/SiteSummary'),
  //       name: 'sitesummary',
  //       meta: {
  //         title: '站点汇总',
  //         role: ['master']
  //       }
  //     },
  //     {
  //       path: 'usersummary',
  //       component: () => import('@/views/operate/UserSummary'),
  //       name: 'usersummary',
  //       meta: {
  //         title: '用户汇总',
  //         role: ['master']
  //       }
  //     },
  //     {
  //       path: 'deliverysummary',
  //       component: () => import('@/views/operate/DeliverySummary'),
  //       name: 'deliverySummary',
  //       meta: {
  //         title: '快递汇总',
  //         role: ['master']
  //       }
  //     },
  //     {
  //       path: 'takeoutsummary',
  //       component: () => import('@/views/operate/TakeOutSummary'),
  //       name: 'takeoutsummary',
  //       meta: {
  //         title: '外卖汇总',
  //         role: ['master']
  //       }
  //     },
  //     {
  //       path: 'announcement',
  //       component: () => import('@/views/operate/Announcement'),
  //       name: 'announcement',
  //       meta: {
  //         title: '平台公告',
  //         role: ['master']
  //       }
  //     },
  //   ]
  // }, 
  // 财务管理路由
  // {
  //   path: '/finance',
  //   component: Layout,
  //   name: 'Finance',
  //   alwaysShow: true,
  //   meta: {
  //     title: '财务管理',
  //     icon: 'chart',
  //     role: ['master']
  //   },
  //   children: [
  //     {
  //       path: 'journal',
  //       component: () => import('@/views/finance/Journal'),
  //       name: 'journal',
  //       meta: {
  //         title: '平台收支',
  //         role: ['master']
  //       }
  //     }
  //   ]
  // },
  // 校园应用路由
  // {
  //   path: '/application',
  //   component: Layout,
  //   name: 'application',
  //   alwaysShow: true,
  //   meta: {
  //     title: '校园应用',
  //     icon: 'table',
  //     role: ['master']
  //   },
  //   children: [
  //     {
  //       path: '/appmall',
  //       component: () => import('@/views/application/AppMall'),
  //       name: 'appmall',
  //       meta: {
  //         title: '应用商城',
  //         role: ['master']
  //       }
  //     }
  //   ]
  // },
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
    name: 'Finance',
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
    meta: {
      title: '校园应用',
      icon: 'table',
      roles: ['admin']
    },
    children: [
      {
        path: '/appmall',
        component: () => import('@/views/application/AppMall'),
        name: 'appmall',
        meta: {
          title: '应用商城',
          roles: ['admin']
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]



export default router



// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465