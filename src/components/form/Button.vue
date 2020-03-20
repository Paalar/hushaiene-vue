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
    height: 30px
    width: 85px
    text-align: center
    font-weight: 700

.white
    background-color: #fff
    color: $red-main
    &:hover
        color: #fff
        background-color: $red-main
        border: 1px solid #fff

.red
    background-color: $red-main
    color: #fff
    &:hover
        color: $red-main
        background-color: #fff
        border: 1px solid $red-main
</style>
