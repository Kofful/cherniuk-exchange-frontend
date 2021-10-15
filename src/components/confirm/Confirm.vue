<template>
  <div v-if="isConfirmed" class="d-flex flex-column justify-content-center">
    <h3>Email is confirmed!</h3>
    <router-link :to="{name: 'Home'}" class="w-50 btn btn-success">Return to home page</router-link>
  </div>
  <div v-else class="d-flex align-content-center">
    <h3 :class="isLoaded ? 'text-danger' : 'text-white'">{{ message }}</h3>
  </div>
</template>

<script>
import {confirmEmail} from "/src/api/auth";

export default {
  name: "Confirm",
  data: () => ({
    isConfirmed: false,
    isLoaded: false,
    message: "Loading..."
  }),
  mounted: async function () {
    const response = await confirmEmail(this.$route.query)
    this.isLoaded = true;
    if (response.status === 200) {
      this.isConfirmed = true;
    } else {
      this.message = "Failed to confirm your email.";
    }
  }
}
</script>
