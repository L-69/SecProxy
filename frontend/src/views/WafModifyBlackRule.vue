<template>
  <div class="config-card p-4 rounded-3 shadow-sm bg-white">
    <h4 class="mb-4"><i class="fas fa-shield-alt me-2"></i>黑名单规则修改</h4>
    
    <div class="alert alert-warning mb-4">
      <i class="fas fa-exclamation-triangle me-2"></i>
      修改黑名单规则可能影响现有防护策略，请谨慎操作
    </div>

    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label class="form-label">规则ID</label>
        <input type="text" class="form-control" v-model="formData.rule_id" 
               required readonly>
      </div>

      <div class="mb-3">
        <label class="form-label">匹配模式</label>
        <select class="form-select" v-model="formData.match_type" required>
          <option value="regex">正则表达式</option>
          <option value="keyword">关键词匹配</option>
          <option value="ip">IP范围</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">规则内容</label>
        <textarea class="form-control" v-model="formData.pattern" 
                  rows="3" required></textarea>
      </div>

      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label">生效时间</label>
          <input type="datetime-local" class="form-control" 
                 v-model="formData.effective_time" required>
        </div>
        <div class="col-md-6">
          <label class="form-label">动作</label>
          <select class="form-select" v-model="formData.action" required>
            <option value="block">拦截</option>
            <option value="log">仅记录</option>
          </select>
        </div>
      </div>

      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="submit" class="btn btn-primary" :disabled="isSaving">
          <i class="fas fa-save me-2"></i>
          <span v-if="isSaving">保存中...</span>
          <span v-else>保存修改</span>
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
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

export default {
  name: 'WafModifyBlackRule',
  setup() {
    const route = useRoute()
    const formData = ref({
      rule_id: '',
      match_type: 'regex',
      pattern: '',
      effective_time: '',
      action: 'block'
    })
    const message = ref('')
    const alertType = ref('')
    const isSaving = ref(false)

    const loadRuleData = async () => {
      try {
        const ruleId = route.params.id
        if (!ruleId) return

        const response = await axios.get(`/api/waf/black_rule/${ruleId}`)
        formData.value = {
          ...response.data,
          effective_time: formatDateTime(response.data.effective_time)
        }
      } catch (error) {
        console.error('加载规则失败:', error)
        message.value = '加载规则失败'
        alertType.value = 'danger'
      }
    }

    const formatDateTime = (timestamp) => {
      const date = new Date(timestamp)
      return date.toISOString().slice(0, 16)
    }

    const submitForm = async () => {
      isSaving.value = true
      try {
        const response = await axios.put('/api/waf/modify_black_rule', formData.value)
        message.value = response.data.message || '规则更新成功'
        alertType.value = 'success'
      } catch (error) {
        console.error('更新规则失败:', error)
        message.value = error.response?.data?.message || '更新失败'
        alertType.value = 'danger'
      } finally {
        isSaving.value = false
      }
    }

    onMounted(loadRuleData)

    return {
      formData,
      message,
      alertType,
      isSaving,
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
