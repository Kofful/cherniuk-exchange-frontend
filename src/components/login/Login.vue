<template>
  <form @submit.prevent="login"
        class="position-absolute top-50 start-50 translate-middle w-50 p-5 border border-white rounded">
    <div class="input-data">
      <div class="form-group">
        <label class="mt-3" for="username-input">Username</label>
        <input id="username-input" name="username"
               :class="{'login-input form-control': true, 'is-invalid': v$.username.$error}"
               type="text" autocomplete="off" v-model.trim="v$.username.$model">
        <div class="invalid-feedback" v-if="v$.username.required.$invalid">Username is required.</div>
        <div class="invalid-feedback" v-if="v$.username.minLengthValue.$invalid">Username must be longer than 3
          characters.
        </div>
        <div class="invalid-feedback" v-if="v$.username.maxLengthValue.$invalid">Username must be shorter than 64
          characters.
        </div>
        <div class="invalid-feedback" v-if="v$.username.username.$invalid">Username must contain only latin letters,
          numbers and specific symbols like: "_", "."
        </div>
      </div>
      <div class="form-group">
        <label class="mt-3" for="password-input">Password</label>
        <input id="password-input" name="password"
               :class="{'login-input form-control': true, 'is-invalid': v$.password.$error}"
               type="password" v-model.trim="v$.password.$model">
        <div class="invalid-feedback" v-if="v$.password.required.$invalid">Password is required.</div>
        <div class="invalid-feedback" v-if="v$.password.minLengthValue.$invalid">Password must be longer than 8
          characters.
        </div>
        <div class="invalid-feedback" v-if="v$.password.maxLengthValue.$invalid">Password must be shorter than 64
          characters.
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
import {required, minLength, maxLength} from '@vuelidate/validators'

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
  validations: () => ({
    username: {
      required,
      minLengthValue: minLength(3),
      maxLengthValue: maxLength(64),
      username: value => {
        return value.match(/^[0-9a-zA-Z_.]*$/)
      }
    },
    password: {
      required,
      minLengthValue: minLength(8),
      maxLengthValue: maxLength(64)
    }
  }),
  methods: {
    async login() {
      const data = JSON.stringify({
        username: this.username,
        password: this.password
      });
      const response = await login(data)
      if (response.token) {
        this.$cookies.set("token", response.token);
        await this.$router.push({name: "Home"});
      } else {
        this.message = "Incorrect username or password";
      }
    }
  }
}
</script>
