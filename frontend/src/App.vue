<template>
  <div class="app-container">
    <Header />
    <main class="main-container">
      <Menu />
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Menu from './components/Menu.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Menu,
    Footer
  }
}
</script>

<style>
/* 全局样式 */
</style>
