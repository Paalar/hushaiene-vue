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
import UserFunctions from '@/firebase/functions/user';
import Page from '@/components/Page.vue';
import SideBar from '@/components/SideBar.vue';

export default {
    name: 'Profile',
    components: {
        Page,
        SideBar,
    },
    mounted() {
        UserFunctions.fetchAllUserPosts(store.getters.user);
    },
};
</script>

<style lang="sass" scoped>
</style>
