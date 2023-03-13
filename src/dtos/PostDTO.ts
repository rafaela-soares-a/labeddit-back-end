import { PostModel } from "../type"


export interface GetPostInput {
    token: string | undefined
}

export type GetPostOutput = PostModel []

export interface CreatePostInput {
    token: string,
    content: unknown
}

export interface LikeDislikesPost {
    idToLikeOrDislike: string,
    token: string | undefined,
    like: number
}


export interface createCommentInput {
    post_id: string,
    commnet: string,
    token: string
}