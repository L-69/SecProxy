<template>
  <div class="config-card p-4 rounded-3 shadow-sm bg-white">
    <h4 class="mb-4"><i class="fas fa-list-ul me-2"></i>白名单列表</h4>

    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th>模版ID</th>
            <th>规则ID</th>
            <th>规则名字</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in whiteList" :key="item.id">
            <td>{{ item.templateId }}</td>
            <td>{{ item.ruleId }}</td>
            <td>{{ item.ruleName }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="d-flex justify-content-between align-items-center mt-3">
      <div>
        每页显示：
        <select v-model="pageSize" @change="fetchData">
          <option value="5">5 条</option>
          <option value="10">10 条</option>
          <option value="20">20 条</option>
        </select>
      </div>
      <div>
        <button class="btn btn-sm btn-outline-secondary me-2" 
                @click="prevPage" 
                :disabled="currentPage === 1">
          上一页
        </button>
        <span>第 {{ currentPage }} 页</span>
        <button class="btn btn-sm btn-outline-secondary ms-2" 
                @click="nextPage" 
                :disabled="currentPage === totalPages">
          下一页
        </button>
      </div>
    </div>

    <div class="d-flex justify-content-end mt-3">
      <button class="btn btn-outline-primary" @click="fetchData">
        <i class="fas fa-sync-alt me-2"></i>刷新列表
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WafListWhite',
  data() {
    return {
      whiteList: [],
      currentPage: 1,
      pageSize: 10,
      totalPages: 1
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(`/api/waf/whitelist?page=${this.currentPage}&size=${this.pageSize}`)
        const data = await response.json()
        this.whiteList = data.items
        this.totalPages = data.totalPages
      } catch (error) {
        console.error('获取白名单数据失败:', error)
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.fetchData()
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.fetchData()
      }
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style scoped>
/* 样式 */
</style>
