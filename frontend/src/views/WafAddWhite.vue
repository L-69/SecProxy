<template>
  <div class="config-card p-4 rounded-3 shadow-sm bg-white">
    <h4 class="mb-4"><i class="fas fa-shield-alt me-2"></i>添加白名单</h4>

    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label class="form-label">白名单参数</label>
        <input type="text" class="form-control" v-model="formData.target" required 
               placeholder='请输入要加入白名单的IP或域名，例如：[{"name":"test1","tags":["waf"],"status":1,"origin":"custom","conditions":[{"key":"IP","opValue":"contain","subKey":"","values":"1.2.5.27"}]}]'>
      </div>

      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="reset" class="btn btn-secondary" @click="resetForm">重置</button>
        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          <i class="fas fa-plus-circle me-2"></i>立即添加
        </button>
      </div>

      <!-- 信息展示区 -->
      <div v-if="message" class="mt-3 text-center" :class="{'text-success': isSuccess, 'text-danger': !isSuccess}">
        {{ message }}
      </div>

      <!-- 说明框 -->
      <div class="mt-3 p-3 border rounded" style="background-color: #f8f9fa; font-size: 0.875rem;">
        <p><strong>使用说明：</strong></p>
        <p>请按照以下格式提供要添加的白名单规则：</p>
        <pre>[{"name":"test1","tags":["waf"],"status":1,"origin":"custom","conditions":[{"key":"IP","opValue":"contain","subKey":"","values":"1.2.5.7"}]}]</pre>
        <p><strong>字段说明：</strong></p>
        <ul>
          <li><strong>name：</strong>规则名称</li>
          <li><strong>tags：</strong>具体标识可查看阿里云waf官方文档，其中waf表示对所有模块加白！</li>
          <li><strong>status：</strong>规则状态，1表示启用，0表示禁用</li>
          <li><strong>origin：</strong>规则来源，custom表示自定义</li>
          <li><strong>conditions：</strong>条件数组，包含规则的具体条件</li>
          <ul>
            <li><strong>key：</strong>条件类型，IP表示IP地址，URI表示URI接口，Cookie表示Cookie，Header表示请求头，具体请阅读阿里云waf官方文档</li>
            <li><strong>opValue：</strong>操作符，contain表示包含，equal表示等于，具体请阅读阿里云waf官方文档</li>
            <li><strong>subKey：</strong>子条件，可选，具体请阅读阿里云waf官方文档</li>
            <li><strong>values：</strong>具体值，多个值用英文逗号分隔</li>
          </ul>
        </ul>
        <p style="color:red;">确保填写的信息格式正确，否则可能无法成功添加。</p>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  name: 'WafAddWhite',
  setup() {
    const formData = ref({
      target: ''
    })
    const message = ref('')
    const isSuccess = ref(false)
    const isSubmitting = ref(false)

    const validateForm = () => {
      if (!formData.value.target) {
        message.value = '请输入白名单参数'
        isSuccess.value = false
        return false
      }

      try {
        JSON.parse(formData.value.target)
        return true
      } catch (error) {
        message.value = '输入的白名单参数格式错误'
        isSuccess.value = false
        return false
      }
    }

    const submitForm = async () => {
      if (!validateForm()) return

      isSubmitting.value = true
      try {
        const response = await axios.post('/api/waf/addwhite', {
          target: formData.value.target
        })

        if (response.data.status === 'success') {
          message.value = '白名单添加成功'
          isSuccess.value = true
          resetForm()
        } else {
          message.value = `错误: ${response.data.message}`
          isSuccess.value = false
        }
      } catch (error) {
        console.error('请求错误:', error)
        message.value = '发生内部错误，请重试'
        isSuccess.value = false
      } finally {
        isSubmitting.value = false
      }
    }

    const resetForm = () => {
      formData.value.target = ''
    }

    return {
      formData,
      message,
      isSuccess,
      isSubmitting,
      submitForm,
      resetForm
    }
  }
}
</script>

<style scoped>
.config-card {
  margin: 20px;
}

pre {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}
</style>
