import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import 'amfe-flexible';
import { Lazyload } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Popup } from 'vant';
import { cell } from 'vant';

Vue.use(cell);
Vue.use(Popup);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);

Vue.config.productionTip = false;
new Vue({
  mode:'hash',
  router,
  render: h => h(App)
}).$mount('#app')
