<template>
    <PageContent>
        <div id="login">
            <button>
                Login
            </button>
        </div>
    </PageContent>
</template>

<script lang="ts">
import Vue from 'vue';
import PageContent from '@/components/PageContent.vue';

export default Vue.extend({
    name: 'Login',
    props: {
        PageContent,
    },
});
</script>
