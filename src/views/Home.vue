<template>
    <page>
        <card
            class="posts"
            :class="{'hidden' : loaded}"
            v-for="post in posts"
            :key="post.id"
        >
            <ol v-for="(value, name, index) in post" :key="index">
                {{name}} : {{ value }}
            </ol>
        </card>
        <spinner class="spinner" :hidden="!loaded" />
    </page>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import firebaseFunctions from '@/firebase/functions';
import store from '@/store';
import Page from '@/components/Page.vue';
import Card from '@/components/Card.vue';
import Spinner from '@/components/Spinner.vue';

firebaseFunctions.fetchAllPosts();

export default {
    name: 'Home',
    components: {
        Page,
        Card,
        Spinner,
    },
    computed: {
        ...mapState(['posts']),
        loaded() {
            return this.posts.length === 0;
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
