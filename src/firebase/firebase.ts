import firebase from 'firebase';
import 'firebase/firestore';
import * as config from './config';

firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')

export {
    db,
    auth,
    currentUser,
    usersCollection
}
