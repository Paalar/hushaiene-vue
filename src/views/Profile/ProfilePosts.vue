<template>
    <div>
        <post
            class="posts"
            v-for="post in posts"
            :key="post.id"
            :post="post"
            :owner="true"
        />
    </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import Post from '@/components/Post.vue';

export default {
    components: {
        Post,
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
.posts
    margin-bottom: 1.5rem
</style>
