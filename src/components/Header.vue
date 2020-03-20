<template>
    <header>
        <h1 id="title">Hushaiene</h1>
        <h3
            v-bind:class="['subTitle', {'activePage' : isActive === home.path}]"
            v-on:click="pushLocation(home.name, home.path)"
            >Utleiere</h3>
        <h3
            v-bind:class="['subTitle', {'activePage' : isActive === regulations.path}]"
            v-on:click="pushLocation(regulations.name, regulations.path)"
            >Lover & regler</h3>
        <h3
            v-bind:class="['subTitle', {'activePage' : isActive === about.path}]"
            v-on:click="pushLocation(about.name, about.path)"
            class="subTitle"
            >Om siden</h3>
        <h3
            v-bind:class="['subTitle', {'activePage' : isActive === createPost.path}]"
            v-on:click="pushLocation(createPost.name, createPost.path)"
            class="subTitle"
            >Nytt Innlegg</h3>
        <button v-if="!isLoggedIn" v-on:click="pushLocation(login.name, login.path)">
            Logg inn
        </button>
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
        pushLocation: (componentName: string, path: string) => {
            const currentComponent = router.currentRoute.name;
            if (currentComponent !== componentName) {
                router.push(path);
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
