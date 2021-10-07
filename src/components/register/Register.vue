<template>
  <form @submit.prevent="register"
        class="position-absolute top-50 start-50 translate-middle w-50 p-5 border border-white rounded">
    <div class="input-data">
      <div class="form-group">
        <label class="mt-3" for="email-input">Email</label>
        <input id="email-input" name="email" :class="{ 'is-invalid': v$.email.$error }" v-model.trim="v$.email.$model"
               class="login-input form-control"
               type="text" autocomplete="off">
        <div class="invalid-feedback" v-if="v$.email.required.$invalid">Email is required.</div>
        <div class="invalid-feedback" v-if="v$.email.email.$invalid">Email is not valid.</div>
      </div>
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
      <p>Already have an account?
        <router-link :to="{name: 'Login'}">Log in</router-link>
      </p>
      <button class="btn btn-success w-50 align-self-center" :disabled="v$.$invalid">Register</button>
      <span class="text-danger align-self-center">{{ message }}</span>
    </div>
  </form>
</template>

<script>
import {register} from "/src/api/auth";
import useVuelidate from '@vuelidate/core'
import {required, email, minLength, maxLength} from '@vuelidate/validators'


export default {
  setup: () => {
    return {v$: useVuelidate()}
  },
  name: "Register",
  data: () => ({
    email: "",
    username: "",
    password: "",
    message: ""
  }),
  validations: () => ({
    email: {
      required,
      email
    },
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
    async register() {
      const data = JSON.stringify({
        email: this.email,
        username: this.username,
        password: this.password
      });
      const response = await register(data);
      if (response.code === 200) {
        this.$toast.info("<h3>We sent confirmation link to your email. Please, check your inbox.</h3>", {
          duration: 0
        });
        await this.$router.push({name: "Home"});
      } else {
        this.message = "";
        response.messages.forEach(msg => {
          this.message += msg;
        });
      }
    }
  }
}
</script>
