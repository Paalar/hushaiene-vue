<template>
    <div class="inputContainer">
        <label v-if="hasLabel"><b>{{ label }}</b></label>
        <select :value="value" @input="setOption">
            <option disabled value="" >{{ disabled }}</option>
            <option v-for="city in cities" :key="city">{{ city }}</option>
        </select>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        value: String,
        cities: Array,
        label: String,
        disabled: String,
    },
    methods: {
        hasLabel() {
            return this.label.length > 0;
        },
        setOption(event: Event) {
            const { selectedIndex } = event.explicitOriginalTarget.options;
            const city = this.cities[selectedIndex - 1];
            return this.$emit('input', city);
        },
    },
};
</script>

<style lang="sass" scoped>

</style>
