<template>
    <div>
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
    .pageContent
        margin auto
        width 50%
</style>
