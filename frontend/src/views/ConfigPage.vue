<template>
  <div class="config-page">
    <div class="header">
      <h1>配置管理</h1>
      <p class="text-muted">管理系统的环境配置</p>
    </div>

    <div class="container">
      <div class="config-form">
        <h3 class="mb-4">环境配置</h3>
        <form @submit.prevent="saveConfig">
          <div v-for="(item, index) in configItems" :key="index" class="form-group">
            <label :for="'config-'+index" class="form-label">{{ item.label }}</label>
            <input 
              :type="item.type || 'text'" 
              class="form-control" 
              :id="'config-'+index"
              v-model="item.value"
              :required="item.required"
              :placeholder="item.placeholder || ''">
          </div>
          <button type="submit" class="btn btn-primary" :disabled="isSaving">
            <span v-if="isSaving">
              <i class="fas fa-spinner fa-spin me-2"></i>保存中...
            </span>
            <span v-else>
              <i class="fas fa-save me-2"></i>保存配置
            </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'ConfigPage',
  setup() {
    const configItems = ref([])
    const isSaving = ref(false)

    const fetchConfig = async () => {
      try {
        const response = await axios.get('/api/config')
        configItems.value = response.data.map(item => ({
          ...item,
          value: item.defaultValue
        }))
      } catch (error) {
        console.error('获取配置失败:', error)
      }
    }

    const saveConfig = async () => {
      isSaving.value = true
      try {
        const configData = configItems.value.reduce((acc, item) => {
          acc[item.key] = item.value
          return acc
        }, {})

        await axios.post('/api/config', configData)
        alert('配置保存成功')
      } catch (error) {
        console.error('保存配置失败:', error)
        alert('保存配置失败')
      } finally {
        isSaving.value = false
      }
    }

    onMounted(fetchConfig)

    return {
      configItems,
      isSaving,
      saveConfig
    }
  }
}
</script>

<style scoped>
.config-page {
  padding: 20px;
}

.header {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 40px;
}

.config-form {
  margin-top: 40px;
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 20px;
}
</style>
