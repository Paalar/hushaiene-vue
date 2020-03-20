<template>
    <page>
        <div class="login">
            <button v-on:click="signInGoogle">
                Login
            </button>
        </div>
    </page>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
// import storeTypes from '@/store/types';
import firebase from 'firebase';
import router from '@/router';
import Page from '@/components/Page.vue';

const provider = new firebase.auth.GoogleAuthProvider();

export default Vue.extend({
    name: 'Login',
    components: {
        Page,
    },
    methods: {
        signInGoogle: () => {
            firebase.auth().signInWithRedirect(provider);
        },
        redirectGoogle: () => {
            if (store.getters.isLoggedIn) {
                router.push('/');
            }
            firebase.auth().getRedirectResult().then(async (result) => {
                if (result.credential) {
                    const OAuth = result.credential;
                    const { accessToken } = OAuth; // TODO cast to oauth to remove error
                    store.dispatch('setToken', accessToken);
                }
                const { user } = result;
                if (user !== null) {
                    await store.dispatch('signIn', user);
                    router.push('/');
                }
            }).catch((error) => {
                // TODO better error handling
                window.alert('Kunne ikke logge inn');
                console.log(error);
                // Handle Errors here.
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                // const credential = error.credential;
                // ...
            });
        },
    },
    mounted() {
        this.redirectGoogle();
    },
};
</script>

<style lang="sass" scoped>
@import '@/assets/css/common.sass'

.loginInfo
    margin-bottom: 3rem

h1
    text-align: center
    border-bottom: 2px solid $red-main
</style>
