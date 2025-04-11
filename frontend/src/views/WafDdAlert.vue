<template>
  <div class="config-card p-4 rounded-3 shadow-sm bg-white">
    <h4 class="mb-4"><i class="fab fa-dingtalk me-2"></i>钉钉告警设置</h4>
    
    <div class="alert alert-info mb-4">
      <i class="fas fa-info-circle me-2"></i>
      请确保已在钉钉群组创建自定义机器人并获取webhook地址
    </div>

    <form @submit.prevent="submitConfig">
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label">Webhook地址</label>
          <input type="url" class="form-control" v-model="formData.webhook" 
                 required placeholder="https://oapi.dingtalk.com/robot/send?access_token=xxx">
        </div>
        <div class="col-md-6">
          <label class="form-label">安全签名</label>
          <input type="text" class="form-control" v-model="formData.secret" 
                 placeholder="加签密钥（可选）">
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">告警级别</label>
        <div class="btn-group w-100" role="group">
          <button type="button" class="btn" 
                  :class="alertLevel === 'urgent' ? 'btn-danger' : 'btn-outline-danger'"
                  @click="alertLevel = 'urgent'">紧急</button>
          <button type="button" class="btn" 
                  :class="alertLevel === 'important' ? 'btn-warning' : 'btn-outline-warning'"
                  @click="alertLevel = 'important'">重要</button>
          <button type="button" class="btn" 
                  :class="alertLevel === 'normal' ? 'btn-info' : 'btn-outline-info'"
                  @click="alertLevel = 'normal'">一般</button>
        </div>
      </div>

      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="button" class="btn btn-secondary" @click="testConnection" :disabled="isTesting">
          <i class="fas fa-plug me-2"></i>
          <span v-if="isTesting">测试中...</span>
          <span v-else>测试连接</span>
        </button>
        <button type="submit" class="btn btn-primary" :disabled="isSaving">
          <i class="fas fa-save me-2"></i>
          <span v-if="isSaving">保存中...</span>
          <span v-else>保存配置</span>
        </button>
      </div>
    </form>

    <!-- 消息提示 -->
    <div v-if="message" class="mt-3 alert" :class="`alert-${alertType}`">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  name: 'WafDdAlert',
  setup() {
    const formData = ref({
      webhook: '',
      secret: ''
    })
    const alertLevel = ref('urgent')
    const message = ref('')
    const alertType = ref('')
    const isSaving = ref(false)
    const isTesting = ref(false)

    const submitConfig = async () => {
      isSaving.value = true
      try {
        const response = await axios.post('/api/dingtalk/config', {
          ...formData.value,
          level: alertLevel.value
        })

        message.value = response.data.message || '配置保存成功'
        alertType.value = 'success'
      } catch (error) {
        console.error('保存配置失败:', error)
        message.value = error.response?.data?.message || '保存配置失败'
        alertType.value = 'danger'
      } finally {
        isSaving.value = false
      }
    }

    const testConnection = async () => {
      isTesting.value = true
      try {
        const response = await axios.get('/api/dingtalk/test')
        message.value = response.data.message || '连接测试成功'
        alertType.value = 'success'
      } catch (error) {
        console.error('测试连接失败:', error)
        message.value = error.response?.data?.message || '测试连接失败'
        alertType.value = 'danger'
      } finally {
        isTesting.value = false
      }
    }

    return {
      formData,
      alertLevel,
      message,
      alertType,
      isSaving,
      isTesting,
      submitConfig,
      testConnection
    }
  }
}
</script>

<style scoped>
.config-card {
  margin: 20px;
}
</style>
