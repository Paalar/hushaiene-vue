<template>
    <div class="loginButton">
        <button @click="signIn" :class="{ 'hidden' : redirecting }">
            <img src="@/assets/images/google-logo.svg" />
            <span>Logg inn med google</span>
        </button>
        <spinner :hide="!redirecting"/>
    </div>
</template>

<script lang="ts">
import Spinner from '@/components/Spinner.vue';
import { signInWithGoogle } from '@/firebase/functions';

export default {
    data() {
        return {
            redirecting: false,
        };
    },
    components: {
        Spinner,
    },
    methods: {
        signIn() {
            signInWithGoogle();
            this.$data.redirecting = true;
        },
    },
};
</script>

<style lang="sass" scoped>
@import '@/assets/css/common.sass'

button
    display: flex
    align-items: center
    color: #fff
    background: $google-blue
    margin: auto
    padding-right: 1rem
    font-weight: 500
    font-size: 16px
    border: 1px solid $google-blue
    &:hover
        transition: all 0.2s linear
        -webkit-box-shadow: 0px 0px 5px 0px $google-blue
        -moz-box-shadow: 0px 0px 5px 0px $google-blue
        box-shadow: 0px 0px 5px 0px $google-blue
    &.hidden
        display: none

img
    background: white
    margin-right: 1rem

.loginButton
    position: relative
    display: flex
    justify-content: center
    align-items: bottom
    > *
        position: absolute
</style>
