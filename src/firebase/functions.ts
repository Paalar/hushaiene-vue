import store from '@/store';
import firebase from 'firebase';
import firebaseConfig from '@/firebase';
import PostInterface from '@/interfaces/post';

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const fetchAllPosts = () => {
    firebaseConfig.postsCollection
        .orderBy('created', 'desc')
        .onSnapshot(async (snapshot) => {
            const posts: PostInterface[] = [];
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

export const signInWithGoogle = () => firebase.auth().signInWithRedirect(googleProvider);

export const signOutPromise = () => firebase.auth().signOut();

export default {
    fetchAllPosts,
    signInWithGoogle,
    signOutPromise,
};
