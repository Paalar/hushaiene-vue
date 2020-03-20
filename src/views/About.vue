<template>
    <div>
        <nav-header/>
        <page>
            <div class="about">
                <h1>This is an about page</h1>
            </div>
        </page>
        <page-footer/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Page from '@/components/Page.vue';

export default Vue.extend({
    name: 'About',
    components: {
        Page,
    },
});
</script>
