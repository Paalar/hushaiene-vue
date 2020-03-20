<template>
    <div>
        <page>
            <div class="home">
                <h1>Home</h1>
                <p v-if="isLoggedIn">Welcome, {{ name }}</p>
            </div>
        </page>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import Page from '@/components/Page.vue';

export default Vue.extend({
    name: 'Home',
    components: {
        Page,
    },
    data: () => ({
        name: store.getters.userDisplayName,
        isLoggedIn: store.getters.isLoggedIn,
    }),
});
</script>
