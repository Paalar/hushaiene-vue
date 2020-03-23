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

// TODO change from strings to reference to get them fast
export const fetchAllUserPosts = async (user) => {
    firebaseConfig.postsCollection
        .where('userId', '==', user.uid)
        .get()
        .then((snapshot) => {
            const posts: Post[] = [];
            snapshot.forEach((document) => {
                const data = document.data();
                const post = {
                    id: document.id,
                    ...data,
                };
                posts.push(post);
            });
            store.dispatch('profile/setPosts', posts);
        })
        .catch((error) => {
            console.log(error);
        });
    // userRef.onSnapshot(async (postRefSnapshot) => {
    //     const documentData = postRefSnapshot.data();
    //     await documentData.posts.forEach((documentSnapshot) => {
    //         // const posts = [];
    //         documentSnapshot.onSnapshot((post) => {
    //             const data = post.data();
    //             // posts.push(data);
    //             store.dispatch('profile/setPosts', post.data());
    //         });
    //     });
    // });
};

export const userExists = (user) => {
    const userRef = firebaseConfig.usersCollection.doc(user.uid);
    return userRef.get()
        // Returns data if exists, else undefined
        .then((doc) => doc.data())
        .catch((error) => {
            console.log(error);
            // Error getting document
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
        .then((result) => {
            const userId = store.getters.user.uid;
            const userRef = firebaseConfig.usersCollection.doc(userId);
            userRef.update({
                posts: firebase.firestore.FieldValue.arrayUnion(result),
            });
        })
        .catch((error) => {
            console.log(error);
        })
);

export const signInWithGoogle = () => firebase.auth().signInWithRedirect(googleProvider);

export const getRedirectFromGoogle = () => {
    if (store.getters.isLoggedIn) {
        router.push('/');
    }
    firebase.auth().getRedirectResult()
        .then(async (result) => {
            if (result.credential) {
                const OAuth = result.credential;
                const { accessToken } = OAuth; // TODO cast to oauth to remove error
                store.dispatch('setToken', accessToken);
            }
            const { user } = result;
            if (user !== null) {
                const userData = await userExists(user);
                if (userData === undefined) {
                    await firebaseConfig.usersCollection.doc(user.uid).set({ posts: [] });
                }
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

export const signOut = () => (
    firebase.auth().signOut().then(async () => {
        await store.dispatch('signOut');
        window.location.assign('/');
    }).catch((error) => {
        console.log(error);
        // sign out unsuccessfull
        // TODO better error handling
        window.alert('Kunne ikke logge ut');
    })
);

export default {
    fetchAllPosts,
    signInWithGoogle,
    signOut,
};
