<template>
    <header>
        <h1 id="title" v-on:click="goHome">Hushaiene</h1>
        <h3
            v-bind:class="['subTitle', {'activePage' : isActive === '/'}]"
            v-on:click="goHome"
            >Utleiere</h3>
        <h3
            v-bind:class="['subTitle', {'activePage' : isActive === '/lover'}]"
            v-on:click="goRegulations"
            >Lover & regler</h3>
        <h3
            v-bind:class="['subTitle', {'activePage' : isActive === '/om'}]"
            v-on:click="goAbout"
            class="subTitle"
            >Om siden</h3>
        <button v-if="!isLoggedIn" v-on:click="goLogin">Logg inn</button>
        <button v-else v-on:click="signOut">Logg ut</button>
    </header>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import store from '@/store';
import router from '@/router';

export default Vue.extend({
    methods: {
        goHome: () => {
            const currentComponent = router.currentRoute.name;
            if (currentComponent !== 'Home') {
                router.push('/');
            }
        },
        goLogin: () => {
            const currentComponent = router.currentRoute.name;
            if (currentComponent !== 'Login') {
                router.push('login');
            }
        },
        goAbout: () => {
            const currentComponent = router.currentRoute.name;
            if (currentComponent !== 'About') {
                router.push('om');
            }
        },
        goRegulations: () => {
            const currentComponent = router.currentRoute.name;
            if (currentComponent !== 'Regulations') {
                router.push('lover');
            }
        },
        signOut: () => {
            firebase.auth().signOut().then(async () => {
                // Sign out successfull
                await store.dispatch('signOut');
                window.location.reload();
            }).catch((error) => {
                console.log(error);
                // TODO better error handling
                window.alert('Kunne ikke logge ut');
                // sign out unsuccessfull
            });
        },
    },
    data: () => ({
        isLoggedIn: store.getters.isLoggedIn,
        isActive: window.location.pathname,
        about: {
            path: '/om',
            name: 'About',
        },
        regulations: {
            path: '/lover',
            name: 'Regulations',
        },
        createPost: {
            path: '/nytt-innlegg',
            name: 'CreatePost',
        },
        home: {
            path: '/',
            name: 'Home',
        },
        login: {
            path: '/login',
            name: 'Login',
        },
    }),
});
</script>

<style lang="stylus">
    header
        background-color #ff5151
        display grid
        grid-template-columns 15% repeat(4, auto) 10%

    #title
        font-size 2.7 em
        margin-left 0.2 em

    .subTitle
        margin auto
        font-size 2 em
        font-weight 100
    .activePage
        border-bottom-style solid
        border-bottom-color white
</style>
