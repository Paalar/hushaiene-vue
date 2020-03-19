<template>
    <div>
        <nav-header/>
        <page-content>
            <div class="regulations">
                Lover og regler
            </div>
        </page-content>
        <page-footer/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PageContent from '@/components/PageContent.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default Vue.extend({
    name: 'Regulations',
    components: {
        'nav-header': Header,
        'page-content': PageContent,
        'page-footer': Footer,
    },
});
</script>
