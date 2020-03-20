<template>
    <div>
        <page>
            <div class="home">
                <h1>Home</h1>
                <p v-if="isLoggedIn">Welcome, {{ name }}</p>
            </div>
            <div id="posts">
                <ul>
                    <li v-for="post in posts" :key="post.userId">
                        {{ post }}
                    </li>
                </ul>
            </div>
        </page>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import firebase from '@/firebase';
import store from '@/store';
import Page from '@/components/Page.vue';
// TODO what is even happenign here
// eslint-disable-next-line no-unused-vars
import PostInterface from '@/interfaces/post';

const posts: PostInterface[] = [];
firebase.postsCollection
    .orderBy('created', 'desc')
    .onSnapshot(async (snapshot) => {
        snapshot.forEach((document) => {
            const data = document.data();
            const post = {
                id: document.id,
                ...data,
            };
            posts.push(post);
        });
        console.log(posts);
        store.dispatch('setPosts', posts);
    });

export default Vue.extend({
    name: 'Home',
    components: {
        Page,
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
