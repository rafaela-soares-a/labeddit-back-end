

export interface TokenPayload {
    id: string,
    apelido: string,
}

export interface UserDB {
    id: string,
    apelido: string,
    email: string,
    password: string,
    create_at: string
}

export interface UserModel {
    id: string,
    apelido: string,
    email: string,
    password: string,
    createAt: string
}

export interface PostDB {
    id: string,
    user_id: string,
    content: string,
    likes: number,
    dislikes: number,
    create_at: string
}

export interface PostModel {
    id: string,
    userId: string,
    content: string,
    likes: number,
    dislikes: number,
    createAt: string
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

