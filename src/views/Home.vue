<template>
    <div>
        <nav-header/>
        <page-content>
            <div class="home">
                <h1>Home</h1>
                <p v-if="isLoggedIn">Welcome, {{ name }}</p>
            </div>
        </page-content>
        <page-footer/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import PageContent from '@/components/PageContent.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default Vue.extend({
    name: 'Home',
    components: {
        'page-content': PageContent,
        'nav-header': Header,
        'page-footer': Footer,
    },
    data: () => ({
        name: store.getters.userDisplayName,
        isLoggedIn: store.getters.isLoggedIn,
    }),
});
</script>
