import { PostModel } from "../type"

export interface SignupInput {
    apelido: unknown,
    email: unknown,
    password: unknown
}

export interface SignupOutput {
    token: string
}

export interface LoginInput {
    email: unknown,
    senha: unknown
}

export interface LoginOutput {
   token: string
}

export interface LogoutOutput{
    token: string
}

export interface GetPostsInputDTO {
    token: string | undefined
}

export type GetPostsOutputDTO = PostModel[]

export interface CreatePostsInpputDTO {
    token: string | undefined
}

export interface EditPotsInputDTO {
    idToEdit: string,
    token: string | undefined,
    content: unknown
}

export interface DeletePotsInputDTO {
    idToDelete: string,
    token: string | undefined
}

export interface LikeOrDislikePostsInputDTO{
    idToLikeOrDislike: string,
    token: string | undefined,
    like: unknown
}