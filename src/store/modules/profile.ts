/* eslint-disable no-param-reassign */
import { Post } from '@/interfaces/firebase';
import { Module } from 'vuex';

interface ModuleState {
    loaded: boolean,
    posts: Post[],
}

const profileModule: Module<ModuleState, any> = {
    namespaced: true,
    state: {
        loaded: false,
        posts: [],
    },
    getters: {
        loaded: (state) => state.loaded,
        posts: (state) => state.posts,
    },
    mutations: {
        setPosts: (state, posts) => {
            state.posts = [...posts];
            state.loaded = true;
        },
    },
    actions: {
        setPosts: ({ commit }, posts) => {
            commit('setPosts', posts);
        },
    },
};

export default profileModule;
