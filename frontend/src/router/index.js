import { createRouter, createWebHistory } from 'vue-router'
import FirstPage from '../views/FirstPage.vue'
import WafListWhite from '../views/WafListWhite.vue'
// 导入其他视图组件

const routes = [
  {
    path: '/first',
    name: 'First',
    component: FirstPage
  },
  {
    path: '/waf_listwhite',
    name: 'WafListWhite',
    component: WafListWhite
  },
  // 其他路由配置
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
