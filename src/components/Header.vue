<template>
    <header>
        <div id="title">
            <h1>
                Hushaiene
            </h1>
            <HusHaieneLogo />
        </div>
        <h3
            v-for="path in paths"
            :key="path.path"
            v-show="(isLoggedIn && path.needAuth) || !path.needAuth"
            :id="path.id"
            :class="['subTitle', {'activePage' : isActive === path.path}]"
            @click="pushLocation(path.name, path.path)"
        >
            <span v-if="path.svg"><ProfileSVG/></span>
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
import { signOut } from '@/firebase/functions';
import store from '@/store';
import router from '@/router';
import Button from '@/components/form/Button.vue';
import HusHaieneLogo from '@/../public/images/hushai.svg';
import ProfileSVG from '@/../public/images/profile.svg';

export default {
    name: 'Header',
    components: {
        'f-button': Button,
        HusHaieneLogo,
        ProfileSVG,
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
                svg: ProfileSVG,
            },
        },
    }),
};
</script>

<style lang="sass" scoped>
@import '@/assets/css/common.sass'

.hushai
    height: 3rem
    padding-left: 1rem
.profile
    height: 2rem
    padding-right: 1rem

header
    background-color: $red-main
    display: grid
    grid-template-columns: repeat(10, 10%)
    button
        grid-column: 10
        margin: auto

#title
    padding: 0.5rem 0 0 0.5rem
    grid-column: 1 / span 2
    align-items: baseline
    display: flex

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
    grid-column: 8 / span 2
    display: flex
    flex-direction: row
    align-items: center

.activePage
    border-bottom-style: solid
    border-bottom-color: white
</style>
