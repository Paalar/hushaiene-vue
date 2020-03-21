<template>
    <div class="inputContainer">
        <label
            v-if="hasLabel">
            <b>{{ label }}</b>
        </label>
        <div
            class="select"
            @click="toggleItemView"
        >
            <div
                class="selector"
                :class="showItems ? 'open' : 'closed' "
            >
                <p
                    class="selected"
                    :class="showItems ? 'open' : 'closed' "
                >{{ selected }}</p>
                <div
                    class="itemContainer"
                    v-if="showItems"
                >
                    <div
                        class="item"
                        v-for="item in items"
                        :key="item"
                        @click="setOption(item)"
                    >
                        <p>{{ item }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        value: String,
        items: Array,
        label: String,
        disabled: String,
    },
    data() {
        return {
            showItems: false,
            selected: this.disabled,
        };
    },
    methods: {
        toggleItemView() {
            this.$data.showItems = !this.$data.showItems;
        },
        hasLabel() {
            return this.label.length > 0;
        },
        setOption(item: String) {
            this.$data.selected = item;
            this.$emit('input', item);
        },
    },
};
</script>

<style lang="sass" scoped>
@import '@/assets/css/common.sass'
$arrow-up: url('../../assets/images/arrow-up.svg')
$arrow-down: url('../../assets/images/arrow-down.svg')
$arrow-width: 10%

.selected
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    user-select: none
    &.closed
        &:after
            width: $arrow-width
            content: $arrow-down
    &.open
        background-color: $disabled-gray
        border-top-left-radius: 5px
        border-top-right-radius: 5px
        &:after
            width: $arrow-width
            content: $arrow-up

.selector
    background-color: #fff
    cursor: pointer
    border-radius: 5px
    position: relative
    align-items: center
    p
        padding: 0.3rem 0.5rem
    &.open
        border-bottom-left-radius: 0px
        border-bottom-right-radius: 0px

.itemContainer
    width: 100%
    background-color: #fff
    border-radius: 0 0 2px 2px
    position: absolute
    border-top: 2px solid $red-main

.item
    padding: 0.2rem
    user-select: none
    &:hover
        background-color: $red-main
</style>
