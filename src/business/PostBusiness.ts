import { create } from "domain"
import { PostDatabase } from "../database/PostDatabase"
import { CreatePostInput, GetPostInput } from "../dtos/PostDTO"
import { GetPostsOutputDTO } from "../dtos/UserDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Post } from "../models/Post"
import { IdGenerator } from "../services/idGenerator"
import { TokenManager } from "../services/TokeManager"


export class PostsBusiness {
    constructor (
        private postsDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) {}

    public getPosts = async (input: GetPostInput): Promise <GetPostsOutputDTO> => {
        const {token} = input

        if (!token) {
            throw new NotFoundError(" 'Token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError ("'Token' inválido")
        }

        const { postDB, userDB} = await this.postsDatabase.getPostCreator() 

        function creator(userId: string) {
            const user = userDB.find((userDB) => {
                return userDB.id === userId
            })
        
            return {
                id: user.id,
                name: user.name
            }
        }
        
        const post = postDB.map((postDB) => {
            const post = new Post (
                postDB.id,
                postDB.content,
                postDB.comment,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.creator
            )

            return post.toBusinessModel()
        })

        const output: GetPostsOutputDTO = post
        
        return output
    }
    public createPost = async (input: CreatePostInput): Promise <void> => {
        const { token, content } = input
    
        if (token === undefined){
            throw new BadRequestError ("'Token' inválido")
        }
    
        if (content === null){
            throw new BadRequestError ("'Token' inválido")
        }
    
        if (typeof content !== "string"){
            throw new BadRequestError ("'Content' deve ser string")
        }
    
        const payload = this.tokenManager.getPayload(token)
    
        if (payload === null) {
            throw new BadRequestError ("'Token' inválido")
        }
    
        const id = this.idGenerator.generate()
        const comment = ""
        const likes = 0
        const dislikes = 0
        const created_at = new Date().toISOString()
        const user_id = payload.id

        const newPost = new Post (
            id,
            content,
            comment,
            likes,
            dislikes,
            created_at,
            {id: user_id,
            name:payload.name}
        )
    
        const postDB = newPost.toBusinessModel()
    
        await this.postsDatabase.insertPost(postDB)
    }


    public createComment = async (input: CreateCommentInput): Promise <void> => {
        const {post_id, comment, token} = input

        if (token === undefined) {
            throw new BadRequestError ("'Token' inválido")
        }

        if (comment === null) {
            throw new BadRequestError ("'Token' inválido")
        }

        if (typeof comment !== "string"){
            throw new BadRequestError ("'Comment' deve ser string")
        }

        if (typeof post_id !== "string"){
            throw new BadRequestError ("'Post_id' deve ser string")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError ("'Token' inválido")
        }

        const postId = await this.postsDatabase.getPotsById(post_id)
        if (!postId){
            throw new BadRequestError ("'Post' não encontrado")
        }

        

    }

}

    