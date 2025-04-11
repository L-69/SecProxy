<template>
  <div class="config-card p-4 rounded-3 shadow-sm bg-white">
    <h4 class="mb-4"><i class="fas fa-ban me-2"></i>黑名单列表</h4>
  
    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th>模版ID</th>
            <th>规则ID</th>
            <th>规则名称</th>
            <th>IP地址列表</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="4" class="text-center text-muted py-4">
              <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">加载中...</span>
              </div>
              正在加载黑名单数据
            </td>
          </tr>
          <tr v-else v-for="(item, index) in blackList" :key="index">
            <td>{{ item.templateId }}</td>
            <td>{{ item.ruleId }}</td>
            <td>{{ item.ruleName }}</td>
            <td>{{ item.ipList.join(', ') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  
    <!-- 分页控制 -->
    <div class="d-flex justify-content-between align-items-center mt-3">
      <div>
        每页显示：
        <select v-model="pageSize" @change="fetchData">
          <option value="5">5 条</option>
          <option value="10" selected>10 条</option>
          <option value="20">20 条</option>
        </select>
      </div>
      <div>
        <button class="btn btn-sm btn-outline-secondary me-2" 
                @click="prevPage" :disabled="currentPage === 1">
          上一页
        </button>
        <span>第 {{ currentPage }} 页</span>
        <button class="btn btn-sm btn-outline-secondary ms-2" 
                @click="nextPage" :disabled="blackList.length < pageSize">
          下一页
        </button>
      </div>
    </div>
  
    <div class="d-flex justify-content-end mt-3">
      <button class="btn btn-outline-primary" @click="refreshList">
        <i class="fas fa-sync-alt me-2"></i>刷新列表
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'WafDescBlackRule',
  setup() {
    const blackList = ref([])
    const isLoading = ref(true)
    const currentPage = ref(1)
    const pageSize = ref(10)

    const fetchData = async () => {
      isLoading.value = true
      try {
        const response = await axios.get('/api/waf/blacklist', {
          params: {
            page: currentPage.value,
            size: pageSize.value
          }
        })
        blackList.value = response.data
      } catch (error) {
        console.error('获取黑名单失败:', error)
      } finally {
        isLoading.value = false
      }
    }

    const nextPage = () => {
      currentPage.value++
      fetchData()
    }

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
        fetchData()
      }
    }

    const refreshList = () => {
      currentPage.value = 1
      fetchData()
    }

    onMounted(fetchData)

    return {
      blackList,
      isLoading,
      currentPage,
      pageSize,
      fetchData,
      nextPage,
      prevPage,
      refreshList
    }
  }
}
</script>

<style scoped>
.config-card {
  margin: 20px;
}

.table-responsive {
  max-height: 500px;
  overflow-y: auto;
}
</style>
