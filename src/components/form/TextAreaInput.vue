<template>
    <div class="inputContainer">
        <label v-if="hasLabel"><b>{{ label }}</b></label>
        <textarea
            wrap="hard"
            :placeholder="placeholder"
            :value="value"
            @input="$emit('input', $event.target.value)"
        />
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

<style lang="sass" scoped>

</style>
