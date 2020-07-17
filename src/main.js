import Vue from "vue";
import {Timeline} from 'ant-design-vue'
import App from "./App.vue";

Vue.use(Timeline);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
