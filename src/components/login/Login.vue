<template>
  <form @submit.prevent="login"
        class="position-absolute top-50 start-50 translate-middle w-50 p-5 border border-white rounded">
    <div class="input-data">
      <label class="mt-3" for="username-input">Username</label>
      <input id="username-input" name="username"
             :class="{'login-input form-control': true, 'is-invalid': !isUsernameValid}"
             type="text" autocomplete="off" v-model="username">
      <label class="mt-3" for="password-input">Password</label>
      <input id="password-input" name="password"
             :class="{'login-input form-control': true, 'is-invalid': !isPasswordValid}"
             type="password" v-model="password">
    </div>
    <div class="link-div mt-3 d-flex flex-column">
      <p>No account yet?
        <router-link to="/register">Register</router-link>
      </p>
      <button class="btn btn-success w-50 align-self-center" :disabled="!isFormValid">Log in</button>
      <span class="text-danger align-self-center">{{ message }}</span>
    </div>
  </form>
</template>

<script>
import {login} from '/src/api/auth';

export default {
  name: "Login",
  data: () => ({
    username: "",
    password: "",
    isPasswordValid: true,
    isUsernameValid: true,
    message: ""
  }),
  watch: {
    password(newValue) {
      this.isPasswordValid = newValue.length >= 8;
      this.message = this.isPasswordValid ? "" : "Password should be 8 characters or longer.";
    },
    username(newValue) {
      this.isUsernameValid = newValue.match(/^[0-9a-zA-Z_.]{3,64}$/);
      this.message = this.isUsernameValid ? "" : "Username should contain only latin letters, numbers and specific symbols \"_\", \".\" and have length from 3 to 64 characters.";
    }
  },
  computed: {
    isFormValid() {
      return (this.isUsernameValid && !!this.username &&
          this.isPasswordValid && !!this.password);
    }
  },
  methods: {
    async login() {
      const data = JSON.stringify({
        username: this.username,
        password: this.password
      });
      const response = await login(data)
      if (response.token) {
        console.log(response);
      } else {
        this.message = "";
        this.message = response.message;
      }
    }
  }
}
</script>
