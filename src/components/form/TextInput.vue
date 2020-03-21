<template>
    <div class="textInput">
        <label>{{ label }}</label>
        <input
            type="text"
            v-model="name"
        >
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        name: String,
        label: String,
        hint: String,
        input: String,
    },
});
</script>
