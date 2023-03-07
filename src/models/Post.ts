import { PostDB, PostModel } from "../type"

export class Post {

    constructor (
        private id: string,
        private userId: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createAt: string
    ){}

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getUserId(): string {
        return this.userId
    }

    public setUserId(value: string): void {
        this.userId = value
    }

    public getContent(): string {
        return this.content
    }

    public setContent(value: string): void {
        this.content = value
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
        return this.createAt
    }

    public setCreateAt(value: string): void {
        this.createAt = value
    }

    public toDBModel(): PostDB {
        return {
            id: this.id,
            user_id: this.userId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            create_at: this.createAt
        }
    }

    public toBusinessModel(): PostModel{
        return {
            id: this.id,
            userId: this.userId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createAt: this.createAt
        }
        }
    }
