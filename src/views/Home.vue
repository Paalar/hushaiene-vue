<template>
    <page>
        <post
            class="posts"
            :class="{'hidden' : !loaded}"
            v-for="post in postsData.posts"
            :key="post.id"
            :post="post"
            />
        <spinner class="spinner" :hidden="loaded" />
        <card v-if="postsData.loaded && postsData.posts.length === 0">
            <h1>Ingen poster tilgjengelig</h1>
        </card>
    </page>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import firebaseFunctions from '@/firebase/functions';
import store from '@/store';
import Page from '@/components/Page.vue';
import Card from '@/components/Card.vue';
import Spinner from '@/components/Spinner.vue';
import Post from '@/components/Post.vue';

firebaseFunctions.fetchAllPosts();

export default {
    name: 'Home',
    components: {
        Page,
        Card,
        Post,
        Spinner,
    },
    computed: {
        ...mapState(['postsData']),
        loaded() {
            return this.postsData.loaded;
        },
    },
    data: () => ({
        name: store.getters.userDisplayName,
        isLoggedIn: store.getters.isLoggedIn,
    }),
};
</script>

<style lang="sass" scoped>
.posts
    margin-bottom: 1.5rem
    &.hidden
        display: none

.spinner
    margin: auto
    position: absolute
    left: 0
    right: 0
    bottom: 0
    top: 0
</style>
