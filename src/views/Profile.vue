<template>
    <page>
        <template v-slot:nav>
            <side-bar class="nav" />
        </template>
        <div>
            <router-view></router-view>
        </div>
    </page>
</template>

<script lang=ts>
import store from '@/store';
import { fetchAllUserPosts } from '@/firebase/functions';
import Page from '@/components/Page.vue';
import SideBar from '@/components/SideBar.vue';

export default {
    name: 'Profile',
    components: {
        Page,
        SideBar,
    },
    mounted() {
        fetchAllUserPosts(store.getters.user);
    },
};
</script>

<style lang="sass" scoped>
</style>
