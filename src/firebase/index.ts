import firebase from 'firebase';
import 'firebase/firestore';
import * as config from './config';

firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const { currentUser } = auth;

// firebase collections
const postsCollection = db.collection('posts');

export default {
    db,
    auth,
    currentUser,
    postsCollection,
};
