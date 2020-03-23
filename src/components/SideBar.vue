<template>
    <div class="navBar">
        <h1>Profil</h1>
        <ul class="navItems">
            <li
                v-for="path in paths"
                :key="path.title"
                :class="['navItem', { 'active' : path.title === selected }]"
                @click="pushLocation(path)"
                >
                {{ path.title }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
interface Path {
    title: string,
    path: string,
    name: string,
}

const posts = { title: 'Innlegg', path: 'innlegg', name: 'ProfilePosts' };
const comments = { title: 'Kommentarer', path: 'kommentarer', name: 'ProfileComments' };
const settings = { title: 'Innstillinger', path: 'innstillinger', name: 'ProfileSettings' };

export default {
    data: () => ({
        selected: posts.title,
        paths: {
            posts,
            comments,
            settings,
        },
    }),
    methods: {
        pushLocation(path: Path) {
            const currentComponent = this.$router.currentRoute.name;
            if (currentComponent !== path.name) {
                this.$router.push(`/profil/${path.path}`);
                this.$data.selected = path.title;
            }
        },
    },
};
</script>

<style lang="sass" scoped>
@import '@/assets/css/common.sass'

.navBar
    padding: 3rem

.navItems

.navItem
    font-size: 1.2rem
    list-style-type: none
    padding: 1rem
    &:hover
        background-color: $red-main
        color: #fff
    &.active
        background-color: $red-main
        color: #fff

</style>
