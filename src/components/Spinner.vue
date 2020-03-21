<template>
    <div class="spinner">
    </div>
</template>

<script lang="ts">
export default { };
</script>

<style lang="sass" scoped>
@import '@/assets/css/common.sass'

.spinner
    width: 50px
    height: 50px
    border: 12px solid $red-dark
    border-top-color: $red-main
    border-radius: 100px

    // Spinning animation
.spinner
    -webkit-transition-property: -webkit-transform
    -webkit-transition-duration: 1.2s
    -webkit-animation-name: rotate
    -webkit-animation-iteration-count: infinite
    -webkit-animation-timing-function: linear

    -moz-transition-property: -moz-transform
    -moz-animation-name: rotate
    -moz-animation-duration: 1.2s
    -moz-animation-iteration-count: infinite
    -moz-animation-timing-function: linear

    transition-property: transform
    animation-name: rotate
    animation-duration: 1.2s
    animation-iteration-count: infinite
    animation-timing-function: linear

    @-webkit-keyframes rotate
        from
            -webkit-transform: rotate(0deg)
        to
            -webkit-transform: rotate(360deg)

    @-moz-keyframes rotate
        from
            -moz-transform: rotate(0deg)
        to
            -moz-transform: rotate(360deg)

    @keyframes rotate
        from
            transform: rotate(0deg)
        to
            transform: rotate(360deg)
</style>
