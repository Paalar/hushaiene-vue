<template>
    <div class="inputContainer">
        <label v-if="hasLabel"><b>{{ label }}</b></label>
        <input
            @input="$emit('input', $event.target.value)"
            :value="value"
            type="text"
            :placeholder="placeholder"
        >
    </div>
</template>

<script lang="ts">
export default {
    props: {
        value: String,
        label: String,
        placeholder: String,
    },
    methods: {
        hasLabel() {
            return this.label.length > 0;
        },
    },
};
</script>
