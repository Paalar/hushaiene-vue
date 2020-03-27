<template>
    <header>
        <h1 id="title">Hushaiene</h1>
        <h3
            v-for="path in paths"
            :key="path.path"
            v-show="(isLoggedIn && path.needAuth) || !path.needAuth"
            :id="path.id"
            :class="['subTitle', {'activePage' : isActive === path.path}]"
            @click="pushLocation(path.name, path.path)"
        >
            {{ path.title }}
        </h3>

        <f-button
            id=".sign"
            v-if="!isLoggedIn"
            @on-click="goLogin"
            :color="'white'"
        >
            Logg inn
        </f-button>
        <f-button
            v-else
            id=".sign"
            @on-click="signOut"
            :color="'white'"
        >
            Logg ut
        </f-button>
    </header>
</template>

<script lang="ts">
import Vue from 'vue';
import { signOut } from '@/firebase/functions';
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
        signOut: () => signOut(),
    },
    data: () => ({
        isLoggedIn: store.getters.isLoggedIn,
        isActive: window.location.pathname,
        login: {
            path: '/login',
            name: 'Login',
        },
        paths: {
            home: {
                path: '/',
                name: 'Home',
                needAuth: false,
                title: 'Utleiere',
                id: 'landlord',
            },
            createPost: {
                path: '/nytt-innlegg',
                name: 'CreatePost',
                needAuth: true,
                title: 'Nytt innlegg',
                id: 'newPost',
            },
            profile: {
                path: '/profil',
                name: 'Profile',
                needAuth: true,
                title: store.getters.userDisplayName,
                id: 'profile',
            },
        },
    }),
});
</script>

<style lang="sass" scoped>
@import '@/assets/css/common.sass'

$profileSVG: url('../assets/images/profile.svg')
$titleSVG: url('../assets/images/hushai.svg')

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
    display: flex
    flex-direction: row
    align-items: center
    justify-content: center
    &:after
        width: 15%
        content: $titleSVG

.subTitle
    margin: auto
    font-size: 1em
    font-weight: 100
    text-align: center
    vertical-align: middle
    cursor: pointer

#landlord
    grid-column: 5

#newPost
    grid-column: 6

#profile
    margin: inherit
    margin-bottom: auto
    margin-top: auto
    grid-column: 9
    display: flex
    flex-direction: row
    align-items: center
    justify-content: center
    &:before
        padding-right: 1rem
        width: 15%
        content: $profileSVG

.activePage
    border-bottom-style: solid
    border-bottom-color: white
</style>
