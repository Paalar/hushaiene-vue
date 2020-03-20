<template>
    <page>
        <card>
            <h1>Nytt innlegg </h1>
            <form>
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

                <div id="toggle">
                    <label><b>Post innlegget anonymt</b></label>
                    <input class="switch" v-model="anonymous" type="checkbox">
                </div>

                <button
                    :disabled="disabled"
                    v-bind:class="{'buttonDisabled' : disabled}"
                    id="post"
                    type="submit">
                    Send inn
                </button>
            </form>
        </card>
    </page>
</template>

<script lang="ts">
import Vue from 'vue';
import Page from '@/components/Page.vue';
import Card from '@/components/Card.vue';

const cities = ['Oslo', 'Bergen', 'Trondheim'];

export default Vue.extend({
    name: 'CreatePost',
    components: {
        Page,
        Card,
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
    },
});
</script>

<style lang="stylus">
    form
        display grid
        grid-template-areas \
            "name name name" \
            "address spacing city" \
            "description description description" \
            "toggle empty empty" \
            "post post post"

        grid-template-columns 1fr 0.1fr 1fr
        grid-template-rows auto

    .input
        display flex
        flex-direction column

        padding 1 rem
        margin-bottom 2rem
        background-color #e0e0e0
        border-radius 10px

        label
            font-size 0.9 rem

        input, select, textarea
            font-size 1.5 rem
            padding 0.7rem 0rem
            background-color #e0e0e0
            border none

        textarea
            resize none
            height 20rem

    #name
        grid-area name

    #address
        grid-area address

    #city
        grid-area city

    #description
        grid-area description

    #toggle
        margin-bottom 2rem
        grid-area toggle

    #post
        grid-area post
        font-size 1.5 rem
        background-color #ff5151
        padding 1.3rem 1rem
        border none
        border-radius 25px

    .buttonDisabled
        background-color #f7f7f7

    .switch
        margin-left 2rem
        vertical-align middle
        -webkit-appearance none
        height 1.9rem
        width 3.5rem
        background-color #e0e0e0
        border-radius 43px
        position relative
        cursor pointer
        &:after
            left 0.3rem
            top 0.2rem
            content ''
            width 1.5rem
            height 1.5rem
            background-color #fff
            position absolute
            border-radius 100%
            transition 0.2s
        &:checked
            background-color #ff5151
            &:after
                transform translateX(1.5rem)
        &:focus
            outline-color transparent
</style>
