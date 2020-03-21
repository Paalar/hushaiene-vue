<template>
    <page>
        <card>
            <h1 class="cardTitle">Nytt innlegg</h1>
            <form v-on:submit.prevent="post">
                <text-input
                    id="name"
                    v-model="landlord"
                    :label="'UTLEIER'"
                    :placeholder="'Ola Nordmann'"
                />

                <text-input
                    id="address"
                    v-model="address"
                    :label="'ADRESSE'"
                    :placeholder="'Slottsplassen 1'"
                />

                <selector-input
                    id="city"
                    v-model="city"
                    :items="cities"
                    :disabled="'Velg en by'"
                    :label="'BY'"
                />

                <text-area-input
                    id="description"
                    v-model="description"
                    :placeholder=
                        "'Utleier tar ikke leietakere seriøst og låser seg inn uanmeldt ...'"
                    :label="'BESKRIVELSE'"
                />

                <Toggle id="toggle" v-model="anonymous"/>

                <f-button
                    id="post"
                    :text="'Send inn'"
                    :color="'red'"
                    :buttonType="'submit'"
                />
            </form>
        </card>
    </page>
</template>

<script lang="ts">
import moment from 'moment';
import store from '@/store';
import router from '@/router';
import firebase from '@/firebase';
import Page from '@/components/Page.vue';
import Card from '@/components/Card.vue';
import TextInput from '@/components/form/TextInput.vue';
import Toggle from '@/components/form/Toggle.vue';
import SelectorInput from '@/components/form/SelectorInput.vue';
import TextAreaInput from '@/components/form/TextAreaInput.vue';
import Button from '@/components/form/Button.vue';

const cities = ['Oslo', 'Bergen', 'Trondheim'];

export default {
    name: 'CreatePost',
    components: {
        Page,
        Card,
        Toggle,
        TextInput,
        SelectorInput,
        TextAreaInput,
        'f-button': Button,
    },
    data: () => ({
        landlord: '',
        address: '',
        city: '',
        description: '',
        anonymous: false,
        disabled: true,
        cities,
    }),
    watch: {
        landlord() { this.isButtonDisabled(); },
        address() { this.isButtonDisabled(); },
        city() { this.isButtonDisabled(); },
        description() { this.isButtonDisabled(); },
    },
    methods: {
        isButtonDisabled() {
            if (this.landlord.length !== 0
                && this.address.length !== 0
                && this.city.length !== 0
                && this.description.length !== 0) {
                this.disabled = false;
            } else {
                this.disabled = true;
            }
        },
        post() {
            firebase.postsCollection.add({
                created: moment().format(),
                likes: 0,
                comments: 0,
                userId: store.getters.user.uid,
                userName: store.getters.user.displayName,
                landlord: this.landlord,
                city: this.city,
                address: this.address,
                description: this.description,
                isAnonymous: this.anonymous,
            }).then((result) => {
                console.log(result);
                router.push('/');
            }).catch((error) => {
                // TODO better error handling
                console.log(error);
            });
        },
    },
};
// For grid-template-areas
/* eslint-disable max-len */
</script>

<style lang="sass" scoped>
@import '@/assets/css/common.sass'

label
    padding: 1rem 1rem 0 1rem
    font-weight: 700

.page
    align-self: center
form
    display: grid
    grid-template-areas: "name name name" "address spacing city" "description description description" "toggle toggle empty" "post post post"
    grid-template-columns: 1fr 0fr 1fr
    grid-template-rows: auto
    grid-gap: 2rem

#name
    grid-area: name

#address
    grid-area: address

#city
    grid-area: city

#description
    grid-area: description

#toggle
    grid-area: toggle

#post
    grid-area: post
    font-size: 1.5rem
    width: auto
    height: auto
    padding: 1.3rem 1rem
</style>
