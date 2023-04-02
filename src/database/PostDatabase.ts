import { CommentDB, CommentLikesDislikesDB, PostDB, PostLikesDislikesDB } from "../type";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"
    public static TABLE_POSTS = "posts"
    public static TABLE_COMMENTS =  "comments"
    public static TABLE_POSTS_LIKESDISLIKES = "posts_likes_dislikes"
    public static TABLE_COMMENTS_LIKESDISLIKES = "comments_likes_dislikes"


    public getAllPosts = async () => {
        const result = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select()

        return result
    }

    public getPostCreator = async () => {
        const postDB = await this.getAllPosts()
        const userDB = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()

        return{
            postDB,
            userDB,
        }
    }

    public insertPost = async (postDB: PostDB): Promise <void> => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .insert(postDB)
    }

    public getPostById = async (id: string): Promise <PostDB | undefined> => {
        const [result]: PostDB[] | undefined = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select()
        .where({id: id})

        return result
    }

    public createComment = async (newCommentDB: CommentDB) => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_COMMENTS)
        .insert(newCommentDB)
    }

    public updatePost = async (newUpdatePostDB: PostDB, id: string) => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .update(newUpdatePostDB)
        .where({id:id})
    }

    public getCommentById = async (id: string): Promise<PostDB | undefined> => {
        const result: PostDB[] | undefined = await BaseDatabase
        .connection(PostDatabase.TABLE_COMMENTS)
        .select()
        .where ({post_id: id})

        return result [0]
    }

    public updateLikeOrDislikesPost = async (updateLikePost: PostLikesDislikesDB) => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS_LIKESDISLIKES)
        .insert(updateLikePost)
    }

    public updateComment = async (updateComment: PostDB, id:string) => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_COMMENTS)
        .update(updateComment)
        .where({id: id})
    }

    public updateLikeOrDislikesComment =  async (updateLikeComment: CommentLikesDislikesDB) => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_COMMENTS_LIKESDISLIKES)
        .insert(updateLikeComment)
    }

}