<template>
  <div v-if="isConfirmed" class="d-flex flex-column justify-content-center">
    <h3>Email is confirmed!</h3>
    <router-link to="/" class="w-50 btn btn-success">Return to home page</router-link>
  </div>
  <div v-else class="d-flex align-content-center">
    <h3 class="text-danger">{{message}}</h3>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Confirm",
  data: () =>({
    isConfirmed: false,
    message: "Loading..."
  }),
  mounted: function () {
    console.log(this);
    axios.get(`http://cherniuk-exchange:8080/api/confirm?code=${this.$route.query.code}&uid=${this.$route.query.uid}`)
    .then(response => {
       if(response.data.code === 200) {
         this.isConfirmed = true;
       } else {
         this.message = "Failed to confirm your email.";
       }
    })
    .catch(error => {
      this.message = "Failed to confirm your email.";
      console.log(error);
    })
  }
}
</script>
