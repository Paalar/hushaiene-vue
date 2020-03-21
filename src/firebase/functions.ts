import moment from 'moment';
import store from '@/store';
import router from '@/router';
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

export const getRedirectFromGoogle = () => {
    if (store.getters.isLoggedIn) {
        router.push('/');
    }
    firebase.auth().getRedirectResult().then(async (result) => {
        if (result.credential) {
            const OAuth = result.credential;
            const { accessToken } = OAuth; // TODO cast to oauth to remove error
            store.dispatch('setToken', accessToken);
        }
        const { user } = result;
        if (user !== null) {
            await store.dispatch('signIn', user);
            router.push('/');
        }
    }).catch((error) => {
        // TODO better error handling
        window.alert('Kunne ikke logge inn');
        console.log(error);
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // const credential = error.credential;
        // ...
    });
};

export const signOutPromise = () => firebase.auth().signOut();

export default {
    fetchAllPosts,
    signInWithGoogle,
    signOutPromise,
};
