<template>
  <div id='app'>
    <router-view/>
  </div>
</template>

<script lang='ts'>
import store from '@/store';

const { user } = store.getters;
if (user === undefined) {
    const { localStorageUser } = store.getters;
    // const { localStorageToken } = store.getters;
    if (localStorageUser != null) {
        store.dispatch('signIn', localStorageUser);
    }
}

export default {

};
</script>

<style lang='stylus'>
@font-face {
    font-family: 'Open Sans';
    src: url('./assets/fonts/Open_Sans/OpenSans-Regular.ttf');
}

#app
    font-family 'Open Sans'
body
    margin 0
</style>
