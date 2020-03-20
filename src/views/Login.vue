<template>
    <page>
        <card>
            <div class="login">
                <div class="loginInfo">
                    <h1>Logg inn</h1>
                </div>
                <google-login/>
            </div>
        </card>
    </page>
</template>

<script lang="ts">
import store from '@/store';
import firebase from 'firebase';
import router from '@/router';
import Page from '@/components/Page.vue';
import Card from '@/components/Card.vue';
import GoogleLogin from '@/components/form/GoogleLogin.vue';

export default {
    name: 'Login',
    components: {
        Page,
        Card,
        GoogleLogin,
    },
    methods: {
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
