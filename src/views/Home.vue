<template>
    <page>
        <card
            class="posts"
            v-for="post in posts"
            :key="post.id"
        >
            <ol v-for="(value, name) in post" :key="value">
                {{name }} : {{ value }}
            </ol>
        </card>
    </page>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import firebase from '@/firebase';
import store from '@/store';
import Page from '@/components/Page.vue';
import Card from '@/components/Card.vue';
// TODO what is even happenign here
// eslint-disable-next-line no-unused-vars
import PostInterface from '@/interfaces/post';

firebase.postsCollection
    .orderBy('created', 'desc')
    .onSnapshot(async (snapshot) => {
        const posts: PostInterface[] = [];
        snapshot.forEach((document) => {
            const data = document.data();
            const post = {
                id: document.id,
                ...data,
            };
            posts.push(post);
        });
        store.dispatch('setPosts', posts);
    });

export default Vue.extend({
    name: 'Home',
    components: {
        Page,
        Card,
    },
    computed: {
        ...mapState(['posts']),
    },
    data: () => ({
        name: store.getters.userDisplayName,
        isLoggedIn: store.getters.isLoggedIn,
        // posts: store.getters.posts,
    }),
    async mounted() {
        // await store.dispatch('fetchPosts');
    },
});
</script>

<style lang="stylus">
    .page
        display flex
        flex-direction column

    .posts
        margin 1rem 0
</style>
