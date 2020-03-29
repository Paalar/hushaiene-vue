import moment from 'moment';
import store from '@/store';
import firebase from 'firebase';
import firebaseConfig from '@/firebase';
import { Post, NewPost } from '@/interfaces/firebase';

// TODO change from strings to reference to get them fast
const fetchAllUserPosts = async (user) => {
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

const createNewPostPromise = (postData: NewPost) => (
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

const deletePostReference = (postId: string) => {
    const postRef = firebaseConfig.postsCollection.doc(postId);
    postRef.delete();
};

const deletePost = (postId: string, userId: string) => {
    const userRef = firebaseConfig.usersCollection.doc(userId);
    const userPostCollection = userRef.collection('posts');
    const postRef = userPostCollection.doc(postId);
    postRef.delete();
};

const deleteUserPost = async (postId: string, userId: string) => {
    deletePost(postId, userId);
    deletePostReference(postId);
};

export default {
    fetchAllUserPosts,
    createNewPostPromise,
    deleteUserPost,
};
