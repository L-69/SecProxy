<template>
  <footer class="footer py-3">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <span class="text-muted">© 2024 安全防护系统 版权所有</span>
        <div class="social-links">
          <a href="mailto:security@example.com" class="text-white me-3">
            <i class="fas fa-envelope"></i>
          </a>
          <a href="#" class="text-white">
            <i class="fas fa-question-circle"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background-color: #343a40;
  color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
