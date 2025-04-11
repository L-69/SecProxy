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
        <!-- 其他WAF菜单项 -->
      </div>
    </div>

    <!-- 其他菜单分组 -->
  </nav>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      isWafMenuOpen: false,
      // 其他菜单状态
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
</style>
