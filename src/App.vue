<template>
  <header-nav/>
  <router-view class="container"></router-view>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue';
import {getUser} from "./api/auth";

export default {
  name: 'App',
  components: {
    HeaderNav
  },
  data: () => ({
    user: null
  }),
  methods: {
    async refreshUser() {
      const token = this.$cookies.get("token");
      if(token) {
        try {
          return await getUser(token);
        } catch {
          return null;
        }
      }
      return null;
    }
  },
  async mounted() {
    this.user = await this.refreshUser();
  },
  async beforeUpdate() {
    this.user = await this.refreshUser();
  }
}
</script>
