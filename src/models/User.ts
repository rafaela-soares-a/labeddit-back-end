import { UserDB, UserModel } from "../type"

export class User {

    constructor (
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private createAt: string
    ) {}

    public getId(): string {
        return this.id
    }

    public setId (value: string): void {
        this.id = value
    }

    public getName(): string {
        return this.name
    }

    public setName (value: string): void {
        this.name = value
    }

    public getEmail(): string {
        return this.email
    }

    public setEmail (value: string): void {
        this.email = value
    }

    public getPassword(): string {
        return this.password
    }

    public setPassword (value: string): void {
        this.password = value
    }

    public getCreateAt(): string {
        return this.createAt
    }

    public setCreateAt (value: string): void {
        this.createAt = value
    }

    public ToDBModel (): UserDB {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            create_at: this.createAt
        }
    }

    public ToBusinessModel(): UserModel {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            createAt: this.createAt 
        }
    }
}