<template>
    <div class="card">
        <slot>
        </slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Card',
});
</script>

<style lang="sass" scoped>
.card
    -webkit-box-shadow: 5px 10px 10px 5px rgba(0,0,0,0.27)
    -moz-box-shadow: 5px 10px 10px 5px rgba(0,0,0,0.27)
    box-shadow: 5px 10px 10px 5px rgba(0,0,0,0.27)

    background-color: #fff
    border-radius: 15px
    padding: 3rem 3rem 3rem 3rem
</style>
