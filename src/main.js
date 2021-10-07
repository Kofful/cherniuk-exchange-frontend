import { createApp } from "vue";
import VueCookies from "vue3-cookies";
import VueToast from 'vue-toast-notification';
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(VueCookies);
app.use(VueToast);
app.use(router);

app.mount('#app')
