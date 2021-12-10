import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import "./index.css";

axios.defaults.baseURL = "http://192.168.1.83:2814/api";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.accessToken;

const app = createApp(App).use(store).use(router);
app.use(VueAxios, axios);
app.config.globalProperties.http;
app.mount("#app");
