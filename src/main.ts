import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import firebaseConfig from './firebase';

Vue.config.productionTip = false;

// handle page reloads
let app: Vue;

firebaseConfig.auth.onAuthStateChanged((user) => {
    if (!app) {
        app = new Vue({
            el: '#app',
            store,
            router,
            render: (h) => h(App),
        });
    }
});
