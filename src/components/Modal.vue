<template>
    <div class="container" @click="clicked">
        <div class="modal">
            <div class="title">
                <slot name="title"></slot>
                <svg width="20" height="20">
                    <svg:style>
                        line {
                            stroke: #fff;
                            stroke-width: 3;
                            cursor: pointer;
                        }
                    </svg:style>
                    <line x1="0" y1="0" x2="20" y2="20"/>
                    <line x1="20" y1="0" x2="0" y2="20"/>
                </svg>
            </div>
            <div class="content"><slot></slot></div>
            <div class="buttons">
                <f-button
                    class="decline"
                    color="red"
                    :on-click="clicked"
                >
                    Ja
                </f-button>
                <f-button
                    class="decline"
                    color="red"
                    :on-click="clicked"
                >
                    Nei
                </f-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Button from '@/components/form/Button.vue';

export default {
    components: {
        'f-button': Button,
    },
    props: {
        close: Function,
        accept: Function,
        decline: Function,
    },
    methods: {
        clicked(event: Event) {
            if (event.target instanceof SVGElement) {
                this.$props.close();
                return;
            }
            const { className } = event.target;
            if (className === 'container') {
                this.$props.close();
            } else if (className.includes('decline')) {
                this.$props.decline();
            } else if (className.includes('accept')) {
                this.$props.accept();
            } else if (className.includes('cross')) {
                this.$props.close();
            }
        },
    },
};
</script>

<style lang="sass" scoped>
@import '@/assets/css/common.sass'
.container
    position: fixed
    z-index: 1
    left: 0
    top: 0
    width: 100%
    height: 100%
    overflow: auto
    background-color: rgb(0,0,0)
    background-color: rgba(0,0,0,0.4)

.modal
    z-index: 2
    margin: 15% auto
    background-color: #fff
    border-radius: 15px
    width: 50%

.title
    font-size: 1.6rem
    color: #fff
    padding: 1.2rem
    background-color: $red-main
    border-top-left-radius: 15px
    border-top-right-radius: 15px
    display: flex
    justify-content: space-between


.content
    margin: 3rem 3rem

.buttons
    padding-bottom: 2rem
    padding-left: 3rem
    :first-child
        margin-right: 5rem
</style>
