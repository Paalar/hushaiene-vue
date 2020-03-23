import Vue from 'vue';
import firebase from 'firebase';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Profile from '@/views/Profile.vue';
import ProfilePosts from '@/views/Profile/ProfilePosts.vue';
import ProfileSettings from '@/views/Profile/ProfileSettings.vue';
import ProfileComments from '@/views/Profile/ProfileComments.vue';
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
        path: '/nytt-innlegg',
        name: 'CreatePost',
        component: CreatePost,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/profil',
        name: 'Profile',
        redirect: 'profil/innlegg',
        component: Profile,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: 'innlegg',
                name: 'ProfilePosts',
                component: ProfilePosts,
            },
            {
                path: 'kommentarer',
                name: 'ProfileComments',
                component: ProfileComments,
            },
            {
                path: 'innstillinger',
                name: 'ProfileSettings',
                component: ProfileSettings,
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
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
