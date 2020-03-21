<template>
    <page>
        <card>
            <h1 class="cardTitle">Nytt innlegg</h1>
            <form v-on:submit.prevent="post">
                <div class="input" id="name">
                    <label><b>UTLEIER</b></label>
                    <input
                        v-on:input="isButtonDisabled()"
                        type="text"
                        v-model="name"
                        placeholder="Ola Nordmann"
                    >
                </div>
                <div class="input" id="address">
                    <label><b>ADRESSE</b></label>
                    <input
                        v-on:input="isButtonDisabled()"
                        type="text"
                        v-model="address"
                        placeholder="Slottsplassen 1"
                    >
                </div>

                <div class="input" id="city">
                    <label><b>BY</b></label>
                    <select v-model="city" v-on:change="isButtonDisabled()">
                        <option disabled value="">Velg en by</option>
                        <option v-for="city in cities" :key="city">{{ city }}</option>
                    </select>
                </div>

                <div class="input" id="description">
                    <label><b>BESKRIVELSE</b></label>
                    <textarea
                        wrap="hard"
                        v-model="description"
                        v-on:input="isButtonDisabled()"
                        placeholder=
                            "Utleier tar ikke leietakere seriøst og låser seg inn uanmeldt ..."
                    >
                    </textarea>
                </div>

                <Toggle id="toggle" v-model="anonymous"/>

                <button
                    :disabled="disabled"
                    :class="['post', {'buttonDisabled' : disabled}]"
                    type="submit">
                    Send inn
                </button>
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
import Toggle from '@/components/form/Toggle.vue';

const cities = ['Oslo', 'Bergen', 'Trondheim'];

export default {
    name: 'CreatePost',
    components: {
        Page,
        Card,
        Toggle,
    },
    data: () => ({
        name: '',
        address: '',
        city: '',
        description: '',
        anonymous: false,
        disabled: true,
        cities,
    }),
    methods: {
        isButtonDisabled() {
            if (this.name.length !== 0
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
                landlord: this.name,
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

.input
    display: flex
    flex-direction: column

    padding: 0 1rem
    background-color: $input-gray
    border-radius: 10px

    input, select, textarea
        padding: 1rem
        background-color: $input-gray

    textarea
        resize: none
        height: 20rem

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
    label
        padding: 0

.post
    grid-area: post
    font-size: 1.5rem
    background-color: $red-main
    padding: 1.3rem 1rem
    border-radius: 25px

.buttonDisabled
    background-color: $background-gray
</style>
