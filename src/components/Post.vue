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
            <div class="information">
                <span class="created">{{ format(post.created) }}</span>
                <div class="stats">
                    <span class="comments">{{ post.comments }} kommentarer</span>
                    <span class="likes">{{ post.likes }} likes</span>
                </div>
                <span
                    class="poster"
                    v-if="!owner"
                >
                    {{ post.isAnonymous ? 'Anonym' : post.userName }}
                </span>
                <span
                    v-else
                    class="delete"
                    @click="openModal(post.id)"
                >
                    slett
                </span>
            </div>
        </div>
    </card>
</template>

<script lang="ts">
import Card from '@/components/Card.vue';
import moment from 'moment';

export default {
    components: {
        Card,
    },
    props: {
        post: Object,
        owner: {
            type: Boolean,
            default: false,
        },
        openModal: Function,
    },
    methods: {
        format: (time: string) => moment(time).format('DD/MM/YYYY'),
    },
};
</script>

<style lang="sass" scoped>
@import '@/assets/css/common.sass'
.post
    display: grid
    grid-row-gap: 1rem
    row-gap: 1rem
    grid-template-areas: "title title title location" "desc desc desc desc" "info info info info"
    h1
        &::first-letter
            color: $red-main

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
    padding-bottom: 2rem

.information
    grid-area: info
    display: grid
    justify-content: center
    grid-template-areas: "date stats stats poster"
    grid-template-columns: repeat(4, 25%)
    .created, .poster
        color: gray

    .created
        grid-area: date
        text-align: left
    .stats
        text-align: center
        grid-area: stats
        display: flex
        justify-content: space-between
    .poster, .delete
        text-align: right
        grid-area: poster
</style>
