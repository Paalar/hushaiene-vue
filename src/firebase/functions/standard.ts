import store from '@/store';
import firebaseConfig from '@/firebase';
import { Post } from '@/interfaces/firebase';

// eslint-disable-next-line import/prefer-default-export
const fetchAllPosts = () => {
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

export default {
    fetchAllPosts,
};
