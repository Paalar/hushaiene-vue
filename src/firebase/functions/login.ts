import store from '@/store';
import router from '@/router';
import firebase from 'firebase';
import firebaseConfig from '@/firebase';

const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = () => firebase.auth().signInWithRedirect(googleProvider);

const signOut = () => (
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

const userExists = (user) => {
    const userRef = firebaseConfig.usersCollection.doc(user.uid);
    return userRef.get()
        // Returns data if exists, else undefined
        .then((doc) => doc.data())
        .catch((error) => {
            console.log(error);
            // Error getting document
        });
};

const getRedirectFromGoogle = () => {
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

export default {
    signInWithGoogle,
    signOut,
    userExists,
    getRedirectFromGoogle,
};
