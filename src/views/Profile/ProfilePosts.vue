<template>
    <div>
        <post
            class="posts"
            v-for="post in posts"
            :key="post.id"
            :post="post"
            :owner="true"
            :openModal="open"
        />
        <modal
            v-if="showModal"
            :accept="accept"
            :decline="close"
            :close="close"
        >
            <template v-slot:title>Slette innlegg</template>
            Sikker på at du vil slette dette innlegget?
        </modal>
    </div>
</template>

<script lang="ts">
import store from '@/store';
import { mapState } from 'vuex';
import UserFunctions from '@/firebase/functions/user';
import Post from '@/components/Post.vue';
import Modal from '@/components/Modal.vue';

export default {
    components: {
        Post,
        Modal,
    },
    data: () => ({
        showModal: false,
        postId: '',
        user: store.getters.user,
    }),
    methods: {
        close() {
            this.$data.showModal = false;
            this.$data.postId = '';
        },
        open(postId: string) {
            this.$data.showModal = true;
            this.$data.postId = postId;
        },
        async accept() {
            await UserFunctions.deleteUserPost(this.postId, this.user.uid);
            this.close();
            // TODO, need to update delete on screen
        },
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
