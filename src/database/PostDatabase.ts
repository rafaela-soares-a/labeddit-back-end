import { PostDB } from "../type";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"
    public static TABLE_POSTS = "posts"


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
}