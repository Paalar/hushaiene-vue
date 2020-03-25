<template>
    <card>
        <div class="post">
            <div class="title">
                <h1>{{ post.landlord }}</h1>
            </div>
            <div class="location">
                <span class="city">{{ post.city }}</span>
                <span>{{ post.address }}</span>
            </div>
            <div class="description">
                <p>{{ post.description }}</p>
            </div>
        </div>
    </card>
</template>

<script lang="ts">
import Card from '@/components/Card.vue';

export default {
    components: {
        Card,
    },
    props: {
        post: Object,
    },
};
</script>

<style lang="sass" scoped>
@import '@/assets/css/common.sass'
.post
    display: grid
    grid-template-areas: "title title title location" "desc desc desc desc"

.title
    grid-area: title

.location
    grid-area: location
    justify-self: flex-end
    font-size: 0.7rem
    *
        display: inline-block
        background-color: $red-main
        color: #fff
        padding: 10px
    .city
        margin-right: 0.5rem
.description
    grid-area: desc
</style>
