<template>
  <div class="content-panel">
    <div id="mainContent">
      <div v-if="loading" class="loading-overlay">
        <div class="loading-spinner"></div>
      </div>

      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div v-else>
        <div v-if="!content" class="welcome-card p-4 rounded-3 shadow-sm bg-white">
          <h3 class="mb-3">欢迎使用安全防护配置平台</h3>
          <p class="text-muted">请从左侧菜单选择要操作的功能模块</p>
        </div>
        <div v-else v-html="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Content',
  props: {
    route: String
  },
  data() {
    return {
      content: null,
      loading: false,
      error: null
    }
  },
  watch: {
    route: {
      immediate: true,
      handler(newRoute) {
        this.loadContent(newRoute)
      }
    }
  },
  methods: {
    async loadContent(route) {
      if (!route) return

      this.loading = true
      this.error = null

      try {
        const response = await fetch(route)
        if (!response.ok) throw new Error('网络响应异常')
        this.content = await response.text()
      } catch (err) {
        this.error = `加载内容出错: ${err.message}`
        this.content = null
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* 内容区域样式 */
</style>
