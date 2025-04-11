<template>
  <div class="config-card p-4 rounded-3 shadow-sm bg-white">
    <h4 class="mb-4"><i class="fas fa-trash-alt me-2"></i>删除白名单</h4>
    
    <div class="alert alert-warning mb-4">
      <i class="fas fa-exclamation-triangle me-2"></i>
      删除操作不可逆，请谨慎操作！
    </div>

    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label class="form-label">目标ID/IP地址</label>
        <input type="text" class="form-control" v-model="formData.target" required 
               placeholder="请输入要删除的白名单ID或IP地址">
      </div>

      <div class="mb-3">
        <label class="form-label">删除原因</label>
        <textarea class="form-control" v-model="formData.reason" rows="3" 
                  placeholder="请填写删除原因（至少20字）" required></textarea>
      </div>

      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="submit" class="btn btn-danger" :disabled="isSubmitting">
          <i class="fas fa-trash me-2"></i>确认删除
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
  name: 'WafDeleteWhite',
  setup() {
    const formData = ref({
      target: '',
      reason: ''
    })
    const message = ref('')
    const alertType = ref('')
    const isSubmitting = ref(false)

    const validateForm = () => {
      if (!formData.value.target) {
        message.value = '请输入目标ID/IP地址'
        alertType.value = 'danger'
        return false
      }
      if (!formData.value.reason || formData.value.reason.length < 20) {
        message.value = '删除原因至少需要20字'
        alertType.value = 'danger'
        return false
      }
      return true
    }

    const submitForm = async () => {
      if (!validateForm()) return
      if (!confirm('确定要删除该白名单记录吗？')) return

      isSubmitting.value = true
      try {
        const response = await axios.delete('/api/waf/delete_white', {
          data: formData.value
        })

        if (response.data.success) {
          message.value = '删除成功'
          alertType.value = 'success'
          formData.value = { target: '', reason: '' }
        } else {
          message.value = response.data.message || '操作失败'
          alertType.value = 'danger'
        }
      } catch (error) {
        console.error('删除失败:', error)
        message.value = '删除失败，请重试'
        alertType.value = 'danger'
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      formData,
      message,
      alertType,
      isSubmitting,
      submitForm
    }
  }
}
</script>

<style scoped>
.config-card {
  margin: 20px;
}
</style>
