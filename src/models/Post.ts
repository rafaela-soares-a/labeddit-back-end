import { PostDB, PostModel } from "../type"

export class Post  {

    constructor (
        private id: string,
    private content: string,
    private comments: string,
    private likes: number, 
    private dislikes: number,
    private createdAt: string,
    private user: {
        id: string,
        name: string
    } 
    ){}

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getContent(): string {
        return this.content
    }

    public setContent(value: string): void {
        this.content = value
    }

    public getComment(): string {
        return this.comments
    }

    public setComment(value: string): void {
        this.comments = value
    }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(value: number): void {
        this.likes = value
    }
    
    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(value: number): void {
        this.dislikes = value
    }

    public getCreateAt(): string {
        return this.createdAt
    }

    public setCreateAt(value: string): void {
        this.createdAt = value
    }

    public getUser():{
        id: string,
        name: string,
    }{
        return this.user
    }

    public setUser(value :{
        id: string,
        name: string,
    }){
        this.user = value
    }

    public toDBModel(): PostDB {
        return {
            id: this.id,
            user_id: this.user.id,
            content: this.content,
            comments: this.comments,
            likes: this.likes,
            dislikes: this.dislikes,
            create_at: this.createdAt,
        }
    }

    public toBusinessModel(): PostModel{
        return {
            id: this.id,
            userId: this.user.id,
            content: this.content,
            comments: this.comments,
            likes: this.likes,
            dislikes: this.dislikes,
            createAt: this.createdAt
        }
        }
    }
