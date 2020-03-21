export interface Post {
    created: string,
    likes: number,
    comments: number,
    id: string,
    address: string,
    city: string,
    description: string,
    isAnonymous: boolean,
    landlord: string,
    userId: string,
    userName: string,
}

export interface NewPost {
    landlord: string,
    city: string,
    address: string,
    description: string,
    isAnonymous: boolean,
}
