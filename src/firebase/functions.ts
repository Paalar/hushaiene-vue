import moment from 'moment';
import store from '@/store';
import firebase from 'firebase';
import firebaseConfig from '@/firebase';
import { Post, NewPost } from '@/interfaces/firebase';

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const fetchAllPosts = () => {
    firebaseConfig.postsCollection
        .orderBy('created', 'desc')
        .onSnapshot(async (snapshot) => {
            const posts: Post[] = [];
            snapshot.forEach((document) => {
                const data = document.data();
                const post = {
                    id: document.id,
                    ...data,
                };
                posts.push(post);
            });
            store.dispatch('setPosts', posts);
        });
};

export const createNewPostPromise = (postData: NewPost) => (
    firebaseConfig.postsCollection.add({
        created: moment().format(),
        likes: 0,
        comments: 0,
        userId: store.getters.user.uid,
        userName: store.getters.user.displayName,
        ...postData,
    })
);

export const signInWithGoogle = () => firebase.auth().signInWithRedirect(googleProvider);

export const signOutPromise = () => firebase.auth().signOut();

export default {
    fetchAllPosts,
    signInWithGoogle,
    signOutPromise,
};
