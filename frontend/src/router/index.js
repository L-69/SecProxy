import { createRouter, createWebHistory } from 'vue-router'
import FirstPage from '../views/FirstPage.vue'
import WafListWhite from '../views/WafListWhite.vue'
import WafAddWhite from '../views/WafAddWhite.vue'
import WafDeleteWhite from '../views/WafDeleteWhite.vue'
import WafAttackReport from '../views/WafAttackReport.vue'
import WafDescBlackRule from '../views/WafDescBlackRule.vue'
import WafModifyBlackRule from '../views/WafModifyBlackRule.vue'
import WafDdAlert from '../views/WafDdAlert.vue'
import ConfigPage from '../views/ConfigPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/first'
  },
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
  {
    path: '/waf_addwhite',
    name: 'WafAddWhite',
    component: WafAddWhite
  },
  {
    path: '/waf_deletewhite',
    name: 'WafDeleteWhite',
    component: WafDeleteWhite
  },
  {
    path: '/waf_attackreport',
    name: 'WafAttackReport',
    component: WafAttackReport
  },
  {
    path: '/waf_descblackrule',
    name: 'WafDescBlackRule',
    component: WafDescBlackRule
  },
  {
    path: '/waf_modifyblackrule',
    name: 'WafModifyBlackRule',
    component: WafModifyBlackRule
  },
  {
    path: '/waf_dd_alert',
    name: 'WafDdAlert',
    component: WafDdAlert
  },
  {
    path: '/config',
    name: 'Config',
    component: ConfigPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
