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
import { mapState } from 'vuex';
import firebaseFunctions from '@/firebase/functions';
import store from '@/store';
import Page from '@/components/Page.vue';
import Card from '@/components/Card.vue';
// eslint-disable-next-line no-unused-vars
import PostInterface from '@/interfaces/post';

firebaseFunctions.fetchAllPosts();

export default {
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
    }),
};
</script>

<style lang="sass" scoped>
.page
    display: flex
    flex-direction: column

.posts
    margin-bottom: 1.5rem
</style>
