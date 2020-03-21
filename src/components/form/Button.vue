<template>
    <button
        class="button"
        @click="$emit('on-click')"
        :class="color"
        :type="buttonType"
    >
        {{ text }}
    </button>
</template>

<script lang="ts">
export default {
    props: {
        buttonType: {
            type: String,
            default: 'button',
            validator(value) {
                return ['button', 'submit'].indexOf(value) !== -1;
            },
        },
        color: {
            type: String,
            validator(value) {
                return ['red', 'white'].indexOf(value) !== -1;
            },
        },
        text: String,
        disabled: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="sass" scoped>
@import '@/assets/css/common.sass'

.button
    border-radius: 100px
    height: 30px
    width: 85px
    text-align: center
    font-weight: 700
    :disabled
        background-color: $background-gray
        color: #000

.white
    background-color: #fff
    color: $red-main
    border: 1px solid #fff
    &:hover
        color: #fff
        background-color: $red-main
        border: 1px solid #fff

.red
    background-color: $red-main
    color: #fff
    border: 1px solid $red-main
    &:hover
        color: $red-main
        background-color: #fff
        border: 1px solid $red-main
</style>
