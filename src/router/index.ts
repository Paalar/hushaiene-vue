import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Login from '@/views/Login.vue';
import Regulations from '@/views/Regulations.vue';
import CreatePost from '@/views/CreatePost.vue';

Vue.use(VueRouter);

const routes = [
    { // Catch all view
        path: '*',
        redirect: '/',
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/om',
        name: 'About',
        component: About,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/lover',
        name: 'Regulations',
        component: Regulations,
    },
    {
        path: '/nytt-innlegg',
        name: 'CreatePost',
        component: CreatePost,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
