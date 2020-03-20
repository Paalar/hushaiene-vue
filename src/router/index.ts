import Vue from 'vue';
import firebase from 'firebase';
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
    /*
    {
        path: '/om',
        name: 'About',
        component: About,
    },
    */
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    /*
    {
        path: '/lover',
        name: 'Regulations',
        component: Regulations,
    },
    */
    {
        path: '/nytt-innlegg',
        name: 'CreatePost',
        component: CreatePost,
        meta: {
            requiresAuth: true,
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
    const { currentUser } = firebase.auth();

    if (requiresAuth && !currentUser) {
        next('/login');
    } else if (requiresAuth && currentUser) {
        next();
    } else {
        next();
    }
});

export default router;
