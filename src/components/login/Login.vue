<template>
  <form @submit.prevent="login"
        class="position-absolute top-50 start-50 translate-middle w-50 p-5 border border-white rounded">
    <div class="input-data">
      <div class="form-group">
        <label class="mt-3" for="username-input">Username</label>
        <input id="username-input" name="username"
               :class="{'login-input form-control': true, 'is-invalid': v$.username.$error}"
               type="text" autocomplete="off" v-model.trim="v$.username.$model">
        <div class="invalid-feedback" v-for="error in v$.username.$errors" :key="error">
          {{ error.$message }}
        </div>
      </div>
      <div class="form-group">
        <label class="mt-3" for="password-input">Password</label>
        <input id="password-input" name="password"
               :class="{'login-input form-control': true, 'is-invalid': v$.password.$error}"
               type="password" v-model.trim="v$.password.$model">
        <div class="invalid-feedback" v-for="error in v$.password.$errors" :key="error">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="link-div mt-3 d-flex flex-column">
      <p>No account yet?
        <router-link :to="{name: 'Register'}">Register</router-link>
      </p>
      <button class="btn btn-success w-50 align-self-center" :disabled="v$.$invalid">Log in</button>
      <span class="text-danger align-self-center">{{ message }}</span>
    </div>
  </form>
</template>

<script>
import {login} from '/src/api/auth';
import useVuelidate from '@vuelidate/core'
import {loginSchema} from "../../utils/validation/auth";

export default {
  setup: () => {
    return {v$: useVuelidate()}
  },
  name: "Login",
  data: () => ({
    username: "",
    password: "",
    message: ""
  }),
  validations: () => (loginSchema),
  methods: {
    async login() {
      const data = JSON.stringify({
        username: this.username,
        password: this.password
      });
      try {
        const response = await login(data);
        this.$cookies.set("token", response.token);
        this.$root.$forceUpdate();
        await this.$router.push({name: "Home"});
      } catch (error) {
        if (error.status === 401) {
          this.message = "Incorrect username or password";
        } else {
          this.message = "Something went wrong";
        }
      }
    }
  }
}
</script>
