<template>
  <header-nav/>
  <router-view class="container"></router-view>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue'

export default {
  name: 'App',
  components: {
    HeaderNav
  }
}
</script>
