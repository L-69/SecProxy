<template>
  <div class="container mt-5">
    <!-- 项目概述 -->
    <section id="project-overview" class="mb-5">
      <h1 class="display-4">SecProxy - 自动化安全协同平台</h1>
      <p class="lead text-muted">通过智能化、自动化的安全运营能力，提升安全响应效率，降低人工成本与资源消耗。</p>

      <h2>项目概述</h2>
      <p>SecProxy 是专为甲方安全人员设计的自动化安全协同平台，通过智能化、自动化的安全运营能力降低人工成本与资源消耗，提升安全响应效率。核心功能围绕阿里云 WAF 3.0 深度集成，实现拦截数据可视化、策略自动化管理及安全趋势分析。</p>
      <div class="image-gallery mb-4">
        <img src="@/assets/img/1.png" alt="图1" class="img-fluid">
        <img src="@/assets/img/2.png" alt="图2" class="img-fluid">
        <img src="@/assets/img/3.png" alt="图3" class="img-fluid">
      </div>
    </section>

    <!-- 技术栈 -->
    <section id="tech-stack" class="mb-5">
      <h2>技术栈</h2>
      <h3>前端</h3>
      <ul>
        <li><strong>语言/框架</strong>: Vue 3 (Composition API)、TypeScript</li>
        <li><strong>核心技术</strong>: 响应式布局、组件化开发、Axios 数据交互</li>
        <li><strong>架构设计</strong>: 清晰分层的组件结构，优化用户体验与功能扩展性</li>
      </ul>
      
      <h3>后端</h3>
      <ul>
        <li><strong>语言/框架</strong>: Python、Flask（Web 框架）、MySQL（数据库）</li>
        <li><strong>核心功能</strong>: 数据存储与处理、API 接口服务、安全策略逻辑实现</li>
        <li><strong>第三方库</strong>: Flask-SQLAlchemy（数据库 ORM）、requests（网络请求）</li>
      </ul>
    </section>

    <!-- 架构设计 -->
    <section id="architecture" class="mb-5">
      <h2>架构设计</h2>
      <h3>前端架构</h3>
      <ul>
        <li><strong>Header</strong>: 固定顶部，展示平台名称与核心价值</li>
        <li><strong>Sidebar</strong>: 左侧固定宽度（1/5），包含功能菜单（如白名单管理、钉钉告警等）</li>
        <li><strong>Content Area</strong>: 主内容区根据路由动态渲染不同功能页面</li>
        <li><strong>Footer</strong>: 底部单行版权信息</li>
      </ul>

      <h3>技术实现</h3>
      <ul>
        <li>使用Vue 3实现响应式布局，适配多终端</li>
        <li>通过Axios与后端API交互，动态渲染数据表格、图表</li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'FirstPage'
}
</script>

<style scoped>
.image-gallery {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.image-gallery img {
  max-width: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
}
</style>
