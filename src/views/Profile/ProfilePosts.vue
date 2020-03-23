<template>
    <div>
        <card>
            <h1>Innlegg</h1>
        </card>
        <card
            v-for="(post, name) in posts"
            :key="name"
        >
            {{ post }}
        </card>
    </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import Card from '@/components/Card.vue';

export default {
    components: {
        Card,
    },
    computed: {
        ...mapState('profile', {
            posts: (state) => state.posts,
            loaded: (state) => state.loaded,
        }),
    },
};
</script>

<style lang="sass" scoped>

</style>
