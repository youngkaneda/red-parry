import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default-dark.css';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueMaterial);
Vue.use(VueToast, {
    position: 'top-right',
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
