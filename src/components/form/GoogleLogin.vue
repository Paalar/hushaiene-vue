<template>
    <button @click="signInWithGoogle">
        <img src="@/assets/images/google-logo.svg" />
        <span>Logg inn med google</span>
    </button>
</template>

<script lang="ts">
import { signInWithGoogle } from '@/firebase/functions';

export default {
    methods: {
        signInWithGoogle,
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
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75)
    -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75)
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75)
    padding-right: 1rem
    border: 1px solid $google-blue
    font-weight: 500
    font-size: 16px

img
    background: white
    margin-right: 1rem
</style>
