<template>
    <page>
        <card>
            <div class="login">
                <div class="cardTitle">
                    <h1>Logg inn</h1>
                </div>
                <google-login/>
            </div>
        </card>
    </page>
</template>

<script lang="ts">
import Page from '@/components/Page.vue';
import Card from '@/components/Card.vue';
import GoogleLogin from '@/components/form/GoogleLogin.vue';
import LoginFunctions from '@/firebase/functions/login';

export default {
    name: 'Login',
    components: {
        Page,
        Card,
        GoogleLogin,
    },
    mounted() {
        LoginFunctions.getRedirectFromGoogle();
    },
};
</script>

<style lang="sass" scoped>
@import '@/assets/css/common.sass'

.login
    padding-bottom: 5rem
</style>
