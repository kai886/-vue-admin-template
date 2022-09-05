import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
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

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },

  {
    path: '/table-level',
    component: Layout,
    redirect: '/table-level/index',
    name: 'table-level',
    meta: { title: '表格管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'table-level',
        component: () => import('@/views/tablelevel/index'),
        meta: { title: 'table' }
      },
      {
        path: 'view',
        name: 'detailed-view',
        component: () => import('@/views/tablelevel/DetailedView/index'),
        meta: { title: '查看详情', activeMenu: '/table-level/index' },
        hidden: true,
      },
      {
        path: 'package',
        name: 'package',
        component: () => import('@/views/tablelevel/package'),
        meta: { title: 'table封装' },
      }
    ]
  },
  {
    path: '/form-level',
    component: Layout,
    redirect: '/form-level/index',
    name: 'form-level',
    meta: { title: '表单管理', icon: 'el-icon-s-help' },
    alwaysShow: true,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/formlevel/index'),
        meta: { title: 'form', icon: 'form' }
      }
    ]
  },

  {
    path: '/second-level',
    component: Layout,
    redirect: '/second-level/table',
    name: 'second-level',
    meta: { title: '二级管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/secondlevel/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      },
      {
        path: 'tabs',
        name: 'Tabs',
        component: () => import('@/views/secondlevel/tabs/index'),
        meta: { title: 'Tabs', icon: 'tree' }
      }
    ]
  },

  {
    path: '/three-level',
    component: Layout,
    redirect: '/three-level/menu1',
    name: 'three-level',
    meta: {
      title: '组件管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu2',
        component: () => import('@/views/threelevel/menu2/index'),
        name: 'Menu2',
        meta: { title: '封装组件' }
      },
      {
        path: 'menu3',
        component: () => import('@/views/threelevel/menu3/index'),
        name: 'Menu3',
        meta: { title: '父子组件' }
      }
    ]
  },

  {
    path: '/map',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/map/index'),
        meta: { title: '地图', icon: 'el-icon-s-help' },
      }
    ]
  },

  {
    path: '/websocket',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/websocket/index'),
        meta: { title: 'websocket', icon: 'el-icon-s-help' },
      }
    ]
  },


  {
    path: '/information',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/information/index'),
        meta: { title: '个人中心', icon: 'el-icon-user-solid' },
        hidden: true
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '外部链接', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
