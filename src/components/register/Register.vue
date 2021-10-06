<template>
  <form @submit.prevent="register" v-if="!this.isRegistered"
        class="position-absolute top-50 start-50 translate-middle w-50 p-5 border border-white rounded">
    <div class="input-data">
      <label class="mt-3" for="email-input">Email</label>
      <input id="email-input" name="email"
             :class="{'login-input form-control': true, 'is-invalid': !isEmailValid}"
             type="text" autocomplete="off" v-model="email">
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
      <p>Already have an account?
        <router-link to="/login">Log in</router-link>
      </p>
      <button class="btn btn-success w-50 align-self-center" :disabled="!isFormValid">Register</button>
      <span class="text-danger align-self-center">{{ message }}</span>
    </div>
  </form>
  <div v-else class="position-absolute top-50 start-50 translate-middle w-50 p-5 border border-white rounded">
    <h3>We sent confirmation link to your email. Please, check your inbox.</h3>
  </div>
</template>

<script>
import {register} from "/src/api/auth";

export default {
  name: "Register",
  data: () => ({
    email: "",
    username: "",
    password: "",
    isEmailValid: true,
    isPasswordValid: true,
    isUsernameValid: true,
    message: "",
    isRegistered: false
  }),
  watch: {
    email(newValue) {
      this.isEmailValid = newValue.match(/^.+@.+$/);
      this.message = this.isEmailValid ? "" : "Invalid email.";
    },
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
      return (this.isEmailValid && !!this.email &&
          this.isUsernameValid && !!this.username &&
          this.isPasswordValid && !!this.password);
    }
  },
  methods: {
    async register() {
      const data = JSON.stringify({
        email: this.email,
        username: this.username,
        password: this.password
      });
      const response = await register(data);
      console.log(response);
      if (response.code === 200) {
        this.isRegistered = true;
      } else {
        this.message = "";
        response.messages.forEach(msg => {
          this.message += msg + ";";
        })
      }
    }
  }
}
</script>
