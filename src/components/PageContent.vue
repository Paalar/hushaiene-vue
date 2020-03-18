<template>
    <div class="pageContent">
        {{ content }}
    </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';

@Component
export default class PageContent extends Vue {
    @Prop() private content!: Vue
}
</script>

<style lang='stylus' scoped>
.pageContent
    background-color red
    margin auto
</style>
