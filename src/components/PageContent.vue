<template>
    <div class="pageContent">
        <slot></slot>
    </div>
</template>

<script lang="ts">
export default {
    name: 'PageContent',
};
</script>

<style lang='stylus'>
.pageContent
    margin auto
    width 50%
</style>
