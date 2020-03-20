<template>
    <div class="page">
        <nav-header />
        <div class="pageContent">
            <slot></slot>
        </div>
        <page-footer />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default Vue.extend({
    name: 'Page',
    components: {
        'nav-header': Header,
        'page-footer': Footer,
    },
});
</script>

<style lang="stylus">
    .page
        display grid
        grid-template-areas \
            "header header header" \
            "nav content side" \
            "footer footer footer"
        grid-template-columns 1fr 2fr 1fr
        grid-template-rows auto 1fr auto
        height 100vh

    header
        grid-area header
    .pageContent
        grid-area content
    footer
        grid-area footer
</style>
