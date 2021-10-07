<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="collapse navbar-collapse justify-content-between">
        <router-link class="navbar-brand" :to="{name: 'Home'}">Exchange</router-link>
        <div>
          <router-link v-if="isAuth" :to="{name: 'Logout'}" class="btn btn-danger">Log out</router-link>
          <router-link v-if="!isAuth" :to="{name: 'Login'}" class="btn btn-success">Log in</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "HeaderNav",
  computed: {
    isAuth() {
      return this.$cookies.get("token");
    }
  }
}
</script>
