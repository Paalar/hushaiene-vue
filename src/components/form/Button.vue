<template>
    <button
        class="button"
        @click="$emit('on-click')"
        :class="[color, { 'disabled' : disabled === true }]"
        :type="buttonType"
        :disabled="disabled"
    >
        <slot></slot>
    </button>
</template>

<script lang="ts">
export default {
    props: {
        buttonType: {
            type: String,
            default: 'button',
            validator(value: string) {
                return ['button', 'submit'].indexOf(value) !== -1;
            },
        },
        color: {
            validator(value: string) {
                const validColors = ['red', 'white'];
                const isValid = validColors.includes(value);
                if (!isValid) {
                    throw new Error(`Color must be one of [${validColors.join(', ')}]`);
                }
                return isValid;
            },
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="sass" scoped>
@import '@/assets/css/common.sass'

$button-border-white: 2px solid #fff
$button-border-red: 2px solid $red-main
.button
    border-radius: 100px
    height: 30px
    width: 85px
    text-align: center
    font-weight: 700
    &:disabled
        background-color: #e0e0e0
        color: $input-gray
        border-color: #e0e0e0
        cursor: not-allowed
        &:hover
            cursor:not-allowed
            border-color: #e0e0e0
            background-color: #e0e0e0
            color: $input-gray

.white
    background-color: #fff
    color: $red-main
    border: $button-border-white
    &:hover
        color: #fff
        background-color: $red-main


.red
    background-color: $red-main
    color: #fff
    border: $button-border-red
    &:hover
        color: $red-main
        background-color: #fff
        border: $button-border-red
</style>
