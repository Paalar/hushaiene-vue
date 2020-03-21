<template>
    <header>
        <h1 id="title">Hushaiene</h1>
        <h3
            id="landlord"
            :class="['subTitle', {'activePage' : isActive === home.path}]"
            @click="pushLocation(home.name, home.path)"
            >Utleiere</h3>
        <!--
        <h3
            v-bind:class="['subTitle', {'activePage' : isActive === regulations.path}]"
            v-on:click="pushLocation(regulations.name, regulations.path)"
            >Lover & regler</h3>
        <h3
            v-bind:class="['subTitle', {'activePage' : isActive === about.path}]"
            v-on:click="pushLocation(about.name, about.path)"
            class="subTitle"
            >Om siden</h3>
        -->
        <h3
            id="newPost"
            v-if="isLoggedIn"
            class="subTitle"
            :class="['subTitle', {'activePage' : isActive === createPost.path}]"
            @click="pushLocation(createPost.name, createPost.path)"
            >Nytt Innlegg</h3>
        <f-button
            id=".sign"
            v-if="!isLoggedIn"
            @on-click="goLogin"
            :color="'white'"
            :text="'Logg inn'"
        />
        <f-button
            v-else
            id=".sign"
            @on-click="signOut"
            :color="'white'"
            :text="'Logg ut'"
        />
    </header>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import store from '@/store';
import router from '@/router';
import Button from '@/components/form/Button.vue';

export default Vue.extend({
    components: {
        'f-button': Button,
    },
    methods: {
        pushLocation(componentName: string, path: string) {
            const currentComponent = router.currentRoute.name;
            if (currentComponent !== componentName) {
                router.push(path);
            }
        },
        goLogin() {
            this.pushLocation('Login', '/login');
        },
        signOut() {
            firebase.auth().signOut().then(async () => {
                // Sign out successfull
                await store.dispatch('signOut');
                window.location.reload();
            }).catch((error) => {
                console.log(error);
                // sign out unsuccessfull
                // TODO better error handling
                window.alert('Kunne ikke logge ut');
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

<style lang="sass" scoped>
@import '@/assets/css/common.sass'

header
    background-color: $red-main
    display: grid
    grid-template-columns: repeat(9, auto)

    button
        grid-column: 10
        margin: auto

#title
    font-size: 2.7em
    margin-left: 0.2em
    grid-column: 1 / span 2

#newPost
    grid-column: 6

#landlord
    grid-column: 5

.subTitle
    margin: auto
    font-size: 2em
    font-weight: 100

.activePage
    border-bottom-style: solid
    border-bottom-color: white
</style>
