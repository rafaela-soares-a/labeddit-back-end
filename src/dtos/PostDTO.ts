import { PostModel } from "../type"


export interface GetPostInput {
    token: string | undefined
}

export type GetPostOutput = PostModel []

export interface CreatePostInput {
    token: string,
    content: unknown
}

export interface LikeOrDislikeInput {
    idToLikeOrDislike: string,
    token: string | undefined,
    like: number
}


export interface CreateCommentInput {
    post_id: string,
    comment: string,
    token: string
}