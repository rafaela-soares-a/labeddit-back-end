

export interface TokenPayload {
    id: string,
    name: string,
}

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    create_at: string
}

export interface UserModel {
    id: string,
    name: string,
    email: string,
    password: string,
    createAt: string
}

export interface PostDB {
    id: string,
    user_id: string,
    content: string,
    comment: string,
    likes: number,
    dislikes: number,
    create_at: string
}

export interface PostModel {
    id: string,
    userId: string,
    content: string,
    comment: string,
    likes: number,
    dislikes: number,
    createAt: string
}

export interface PostsCreatorDB{
    id: string,
    content: string,
    comment: string,
    likes: number, 
    dislikes: number,
    createdAt: string,
    user: {
        id: string,
        name: string
    }
}
export interface CommentDB {
    id: string,
    user_id: string,
    post_id: string,
    comment: string,
    likes: number,
    dislikes: number,
    create_at: string
}

export interface CommnetModel {
    id: string,
    userId: string,
    postId: string,
    comment: string,
    likes: number,
    dislikes: number,
    createAt: string
}

export interface CommentsCreatorDB {
    id: string,
    post_id: string,
    comment: string,
    likes: number,
    dislikes: number,
    created_at: string,
    user: {
        user_id: string,
        name: string
    }
}


export interface PostLikesDislikesModel{
    userId: string,
    postId: string,
    like: number
}

export interface PostLikesDislikesDB{
    user_id: string,
    post_id: string,
    like: number
}

export interface CommentLikesDislikesModel{
    userId: string,
    commnetId: string,
    like: number
}

export interface CommentLikesDislikesDB{
    user_id: string,
    commnet_id: string,
    like: number
}

