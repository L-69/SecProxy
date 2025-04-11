<template>
  <div class="config-card p-4 rounded-3 shadow-sm bg-white">
    <h4 class="mb-4"><i class="fas fa-chart-bar me-2"></i>攻击报表分析</h4>
    
    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <select class="form-select" v-model="timeRange">
          <option value="24h">最近24小时</option>
          <option value="7d">最近7天</option>
          <option value="30d">最近30天</option>
        </select>
      </div>
      <div class="col-md-8 d-flex gap-2 justify-content-end">
        <button class="btn btn-outline-primary" @click="refreshCharts">
          <i class="fas fa-sync-alt me-2"></i>刷新数据
        </button>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col">
        <div class="card h-100">
          <div class="card-header">攻击类型分布</div>
          <div class="card-body">
            <canvas ref="typeChart"></canvas>
          </div>
        </div>
      </div>
      
      <div class="col">
        <div class="card h-100">
          <div class="card-header">攻击趋势分析</div>
          <div class="card-body">
            <canvas ref="trendChart"></canvas>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <div class="card">
        <div class="card-header">详细攻击日志</div>
        <div class="card-body">
          <div class="overflow-auto" style="max-height: 400px">
            <div v-for="(log, index) in attackLogs" :key="index" class="alert alert-danger py-2 mb-2">
              <div class="d-flex justify-content-between">
                <span>{{ formatDate(log.time) }}</span>
                <strong>{{ log.type }}</strong>
              </div>
              <div class="text-muted">{{ log.ip }} - {{ log.detail }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import Chart from 'chart.js/auto'

export default {
  name: 'WafAttackReport',
  setup() {
    const timeRange = ref('24h')
    const attackLogs = ref([])
    const typeChart = ref(null)
    const trendChart = ref(null)
    const typeChartInstance = ref(null)
    const trendChartInstance = ref(null)

    const initCharts = () => {
      const typeCtx = typeChart.value.getContext('2d')
      const trendCtx = trendChart.value.getContext('2d')

      typeChartInstance.value = new Chart(typeCtx, {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: [{
            data: [],
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
          }]
        }
      })

      trendChartInstance.value = new Chart(trendCtx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: '攻击次数',
            data: [],
            borderColor: '#dc3545',
            tension: 0.1
          }]
        }
      })
    }

    const loadReportData = async () => {
      try {
        const response = await axios.get('/api/waf/attack_report', {
          params: { range: timeRange.value }
        })
        updateTypeChart(response.data.types)
        updateTrendChart(response.data.trend)
        attackLogs.value = response.data.logs
      } catch (error) {
        console.error('获取攻击报告失败:', error)
      }
    }

    const updateTypeChart = (data) => {
      typeChartInstance.value.data.labels = Object.keys(data)
      typeChartInstance.value.data.datasets[0].data = Object.values(data)
      typeChartInstance.value.update()
    }

    const updateTrendChart = (data) => {
      trendChartInstance.value.data.labels = data.labels
      trendChartInstance.value.data.datasets[0].data = data.values
      trendChartInstance.value.update()
    }

    const refreshCharts = () => {
      typeChartInstance.value.data.labels = []
      typeChartInstance.value.data.datasets[0].data = []
      trendChartInstance.value.data.labels = []
      trendChartInstance.value.data.datasets[0].data = []
      typeChartInstance.value.update()
      trendChartInstance.value.update()
      loadReportData()
    }

    const formatDate = (timestamp) => {
      return new Date(timestamp).toLocaleString()
    }

    onMounted(() => {
      initCharts()
      loadReportData()
    })

    watch(timeRange, loadReportData)

    return {
      timeRange,
      attackLogs,
      typeChart,
      trendChart,
      refreshCharts,
      formatDate
    }
  }
}
</script>

<style scoped>
.config-card {
  margin: 20px;
}
</style>
