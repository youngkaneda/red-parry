import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Search from '../components/Search.vue';
import Edit from '../components/Edit.vue';
import Redirect from '../components/Redirect.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            { path: '', component: Search },
            { path: 'edit/', name: 'edit', component: Edit },
            { path: 'redirect/', name: 'redirect', component: Redirect },
        ],
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
