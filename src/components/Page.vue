<template>
    <div class="pageContainer">
        <nav-header />
        <div class="page">
            <slot class="pageContent"></slot>
        </div>
        <page-footer />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default Vue.extend({
    name: 'Page',
    components: {
        'nav-header': Header,
        'page-footer': Footer,
    },
});
</script>

<style lang="sass" scoped>
.pageContainer
    display: grid
    grid-template-areas: "header header header" "nav content side" "footer footer footer"
    grid-template-columns: 1fr 2fr 1fr
    grid-template-rows: auto 1fr auto
    height: 100vh

header
    grid-area: header
.page
    grid-area: content
    margin-top: 2rem
    margin-bottom: 2.5rem
footer
    grid-area: footer
</style>
