import { create } from "domain"
import { PostDatabase } from "../database/PostDatabase"
import { CreateCommentInput, CreatePostInput, GetPostInput, LikeOrDislikeInput } from "../dtos/PostDTO"
import { GetPostsOutputDTO } from "../dtos/UserDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Post } from "../models/Post"
import { IdGenerator } from "../services/idGenerator"
import { TokenManager } from "../services/TokeManager"


export class PostsBusiness {
    constructor(
        private postsDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public getPosts = async (input: GetPostInput): Promise<GetPostsOutputDTO> => {
        const { token } = input

        if (!token) {
            throw new NotFoundError(" 'Token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("'Token' inválido")
        }

        const { postDB, userDB } = await this.postsDatabase.getPostCreator()

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
            const post = new Post(
                postDB.id,
                postDB.content,
                postDB.comment,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                creator(postDB.user_id),
                postDB.post_comment
            )

            return post.toPostBusinessModel()
        })

        const output: GetPostsOutputDTO = post

        return output
    }
    public createPost = async (input: CreatePostInput): Promise<void> => {
        const { token, content } = input

        if (token === undefined) {
            throw new BadRequestError("'Token' inválido")
        }

        if (content === null) {
            throw new BadRequestError("'Token' inválido")
        }

        if (typeof content !== "string") {
            throw new BadRequestError("'Content' deve ser string")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("'Token' inválido")
        }

        const id = this.idGenerator.generate()
        const comment = ""
        const likes = 0
        const dislikes = 0
        const created_at = new Date().toISOString()
        const user_id = payload.id

        const newPost = new Post(
            id,
            content,
            comment,
            likes,
            dislikes,
            created_at,
            {
                id: user_id,
                name: payload.name
            },
            {
                id: '',
                post_id: '',
                comment: '',
                likes: 0,
                dislikes: 0,
                created_at: '',
                user: {
                    user_id: '',
                    name: ''
                }
            }
        )

        const postDB = newPost.toPostDBModel()

        await this.postsDatabase.insertPost(postDB)
    }


    public createComment = async (input: CreateCommentInput): Promise<void> => {
        const { post_id, comment, token } = input

        if (token === undefined) {
            throw new BadRequestError("'Token' inválido")
        }

        if (comment === null) {
            throw new BadRequestError("'Token' inválido")
        }

        if (typeof comment !== "string") {
            throw new BadRequestError("'Comment' deve ser string")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("'Token' inválido")
        }

        const postId = await this.postsDatabase.getPostById(post_id)

        if (!postId) {
            throw new BadRequestError("'Post' não encontrado")
        }

        const id = this.idGenerator.generate()
        const content = ''
        const likes = 0
        const dislikes = 0
        const create_at = new Date().toISOString()
        const user_id = payload.id

        const newComment = new Post(
            id,
            content,
            comment,
            likes,
            dislikes,
            create_at,
            {
                id: user_id,
                name: payload.name
            },
            {
                id: '',
                post_id: '',
                comment: '',
                likes: 0,
                dislikes: 0,
                created_at: '',
                user: {
                    user_id: '',
                    name: ''
                }
            }
        )

        const updatePost = new Post (
            postId.id,
            postId.content,
            postId.comment,
            postId.likes,
            postId.dislikes,
            postId.create_at,
            {
                id:user_id,
                name: payload.name
            },
            {
                id: '',
                post_id: '',
                comment: '',
                likes: 0,
                dislikes: 0,
                created_at: '',
                user: {
                    user_id: '',
                    name: ''
                }
            }
        )

        const newCommnetDB = newComment.toModelCommentDB()
        await this.postsDatabase.createComment(newCommnetDB)

        const newUpDatePostDB = updatePost.toPostDBModel()
        await this.postsDatabase.updatePost(newUpDatePostDB, postId.id)
    }

    public likeOrDislike = async (input: LikeOrDislikeInput): Promise<void> => {
        const { idToLikeOrDislike, token, like } = input

        if (token === undefined) {
            throw new BadRequestError("'Token' inválido")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("'Token' inválido")
        }

        if (typeof like !== "boolean") {
            throw new BadRequestError("'Like' deve ser boolean")
        }

        const postToLike = await this.postsDatabase.getPostById(idToLikeOrDislike)
        const commentToLike = await this.postsDatabase.getCommentById(idToLikeOrDislike)

        if (!postToLike) {
            throw new BadRequestError("'id' não encontrado")
        }

        if (!commentToLike) {
            throw new BadRequestError("'id' não encontrado")
        }

        //Like/Dislike do Post

        if (postToLike) {
            let like = postToLike.likes
            let dislikes = postToLike.dislikes

            if (like === 0) {
                dislikes++
            } else if (like === 1) {
                like++
            } else {
                throw new BadRequestError("Você não pode fazer duas ações")
            }
        }

        const postLiked = new Post(
            idToLikeOrDislike,
            postToLike.content,
            postToLike.comment,
            postToLike.likes,
            postToLike.dislikes,
            postToLike.create_at,
            {
                id: postToLike.user_id,
                name: payload.name
            },
            {
                id: '',
                post_id: '',
                comment: '',
                likes: 0,
                dislikes: 0,
                created_at: '',
                user: {
                    user_id: '',
                    name: ''
                }
            }
        )

        const userId = payload.id
        const likesSended = like ? 1 : 0

        const updateLikePost = {
            user_id: userId,
            post_id: idToLikeOrDislike,
            like: likesSended
        }

        const postLikedDB = postLiked.toPostDBModel()
        await this.postsDatabase.updatePost(postLikedDB, idToLikeOrDislike)
        await this.postsDatabase.updateLikeOrDislikesPost(updateLikePost)


        //Like/Dislike do Comment

        if (commentToLike) {
            let like = commentToLike.likes
            let dislikes = commentToLike.dislikes

            if (like === 0) {
                dislikes++
            } else if (like === 1) {
                like++
            } else {
                throw new BadRequestError("Você não pode fazer duas ações")
            }
        }

        const commentLiked = new Post(
            idToLikeOrDislike,
            commentToLike.content,
            commentToLike.comment,
            commentToLike.likes,
            commentToLike.dislikes,
            commentToLike.create_at,
            {
                id: commentToLike.user_id,
                name: payload.name
            },
            {
                id: '',
                post_id: '',
                comment: '',
                likes: 0,
                dislikes: 0,
                created_at: '',
                user: {
                    user_id: '',
                    name: ''
                }
            }
        )

        const updateLikeComment = {
            user_id: userId,
            comment_id: idToLikeOrDislike,
            like: likesSended
        }

        const commentLikedDB = commentLiked.toPostDBModel()
        await this.postsDatabase.updateComment(commentLikedDB, idToLikeOrDislike)
        await this.postsDatabase.updateLikeOrDislikesComment(updateLikeComment)
    }
}

