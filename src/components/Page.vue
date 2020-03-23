<template>
    <div class="pageContainer">
        <nav-header class="header"/>
        <div class="page">
            <div class="nav"><slot name="nav"></slot></div>
            <div class="content"><slot></slot></div>
            <div class="side"><slot name="side"></slot></div>
        </div>
        <page-footer class="footer"/>
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
    grid-template-areas: "header header header" "page page page" "footer footer footer"
    grid-template-columns: 1fr 2fr 1fr
    grid-template-rows: auto 1fr auto
    height: 100vh

.header
    grid-area: header

.page
    display: grid
    grid-area: page
    grid-template-areas: "nav content side"
    grid-template-columns: 1fr 2fr 1fr

.footer
    grid-area: footer

.nav
    grid-area: nav
.content
    grid-area: content
    padding: 2rem 0
.side
    grid-area: side
</style>
