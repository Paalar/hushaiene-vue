<template>
    <div>
        <label><b>Post innlegget anonymt</b></label>
        <input
            class="switch"
            type="checkbox"
            @input="$emit('input', $event.target.checked)"
        >
    </div>
</template>

<script lang="ts">
export default {
    props: {
        value: Boolean,
    },
};
</script>

<style lang="sass" scoped>
@import '@/assets/css/common.sass'

.switch
    margin-left: 2rem
    vertical-align: middle
    -webkit-appearance: none
    height: 1.9rem
    width: 3.5rem
    background-color: $input-gray
    border-radius: 43px
    position: relative
    cursor: pointer
    &:after
        left: 0.3rem
        top: 0.2rem
        content: ''
        width: 1.5rem
        height: 1.5rem
        background-color: #fff
        position: absolute
        border-radius: 100%
        transition: 0.2s
    &:checked
        background-color: $red-main
        &:after
            transform: translateX(1.5rem)
    &:focus
        outline-color: transparent
</style>
