import VueChatScroll from 'vue-chat-scroll'; // plugin per autoscrolling
import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.use(VueChatScroll);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

