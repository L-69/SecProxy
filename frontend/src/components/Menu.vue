<template>
  <nav class="menu-panel">
    <!-- 首页菜单项 -->
    <button class="menu-item active" 
            @click="navigate('/first')">
      <i class="fas fa-home me-2"></i> 首页
    </button>

    <!-- 阿里WAF 分组 -->
    <div class="menu-group">
      <button class="btn btn-link" 
              type="button" 
              @click="toggleMenu('wafMenu')"
              :aria-expanded="isWafMenuOpen">
        <i class="fas fa-shield-alt me-2"></i> 阿里WAF
      </button>
      <div class="collapse" :class="{ show: isWafMenuOpen }">
        <button class="menu-item" 
                @click="navigate('/waf_listwhite')">
          <i class="fas fa-list-ul me-2"></i> 白名单列表
        </button>
        <button class="menu-item" 
                @click="navigate('/waf_addwhite')">
          <i class="fas fa-plus-circle me-2"></i> 添加白名单
        </button>
        <button class="menu-item" 
                @click="navigate('/waf_deletewhite')">
          <i class="fas fa-trash-alt me-2"></i> 删除白名单
        </button>
        <button class="menu-item" 
                @click="navigate('/waf_attackreport')">
          <i class="fas fa-chart-bar me-2"></i> 攻击汇总分析
        </button>
        <button class="menu-item" 
                @click="navigate('/waf_descblackrule')">
          <i class="fas fa-shield-alt me-2"></i> 黑名单规则查看
        </button>
        <button class="menu-item" 
                @click="navigate('/waf_modifyblackrule')">
          <i class="fas fa-shield-alt me-2"></i> 黑名单规则修改
        </button>
        <button class="menu-item" 
                @click="navigate('/waf_dd_alert')">
          <i class="fab fa-dingtalk me-2"></i> 钉钉告警设置
        </button>
      </div>
    </div>

    <!-- 系统配置 分组 -->
    <div class="menu-group">
      <button class="btn btn-link" 
              type="button" 
              @click="toggleMenu('configMenu')"
              :aria-expanded="isConfigMenuOpen">
        <i class="fas fa-cogs me-2"></i> 系统配置
      </button>
      <div class="collapse" :class="{ show: isConfigMenuOpen }">
        <button class="menu-item" 
                @click="navigate('/config')">
          <i class="fas fa-cogs me-2"></i> 系统配置
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      isWafMenuOpen: false,
      isConfigMenuOpen: false
    }
  },
  methods: {
    toggleMenu(menu) {
      this[`is${menu}Open`] = !this[`is${menu}Open`]
    },
    navigate(route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
/* 菜单样式 */
.menu-panel {
  width: 250px;
  background-color: #f8f9fa;
  padding: 20px;
  height: 100%;
  border-right: 1px solid #dee2e6;
}

.menu-item {
  display: block;
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 5px;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.3s;
}

.menu-item:hover {
  background-color: #e9ecef;
}

.menu-item.active {
  background-color: #0d6efd;
  color: white;
}

.menu-group {
  margin-top: 15px;
}

.collapse {
  padding-left: 15px;
}
</style>
