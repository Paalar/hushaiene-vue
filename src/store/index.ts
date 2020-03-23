/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import { Post } from '@/interfaces/firebase';
// import types from './types';
import profileModule from './modules/profile';

Vue.use(Vuex);

interface storeState {
    user?: Object,
    token?: String,
    posts: Post[]
}

export default new Vuex.Store({
    state: {
        user: undefined,
        token: undefined,
        posts: [],
    } as storeState,
    getters: {
        isLoggedIn: (state) => state.user != null,
        user: (state) => state.user,
        userDisplayName: (state) => {
            if (state.user != null) {
                return state.user.displayName;
            }
            return null;
        },
        localStorageUser: (state) => {
            const userString = window.localStorage.getItem('user');
            if (userString != null) {
                return JSON.parse(userString);
            }
            return undefined;
        },
        localStorageToken: (state) => window.localStorage.getItem('token'),
        posts: (state) => state.posts,
    },
    mutations: {
        signIn: async (state, user) => {
            await window.localStorage.setItem('user', JSON.stringify(user));
            state.user = user;
        },
        signOut: async (state) => {
            await window.localStorage.removeItem('user');
            await window.localStorage.removeItem('token');
            state.user = undefined;
            state.token = undefined;
        },
        setToken: async (state, token) => {
            await window.localStorage.setItem('token', token);
            state.token = token;
        },
        setPosts: async (state, newPosts) => {
            state.posts = [...newPosts];
        },
    },
    actions: {
        signIn: async ({ commit }, user) => {
            await commit('signIn', user);
        },
        signOut: async ({ commit }) => {
            await commit('signOut');
        },
        setToken: async ({ commit }, token) => {
            await commit('setToken', token);
        },
        setPosts: ({ commit }, newPosts) => {
            commit('setPosts', newPosts);
        },
    },
    modules: {
        profile: profileModule,
    },
});
