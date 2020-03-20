<template>
    <button
        v-on:click="$emit('on-click')"
        class="button"
        :class="type"
    >
        {{ text }}
    </button>
</template>

<script lang="ts">
export default {
    props: {
        type: String,
        text: String,
    },
};
</script>

<style lang="sass" scoped>
@import '@/assets/css/common.sass'

.button
    border-radius: 25px
    height: 25px
    width: 75px
    text-align: center

.white
    background-color: #fff
    color: $red-main

.red
    background-color: $red-main
    color: #fff
</style>
