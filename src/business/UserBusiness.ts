import { UserDatabase } from "../database/UserDatabase";
import { LoginInput, LoginOutput, SignupInput, SignupOutput } from "../dtos/UserDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/TokeManager";
import { TokenPayload } from "../type";

export class UserBusiness {
    constructor (
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager

    ) {}

    public signup = async (input: SignupInput): Promise<SignupOutput> => {
        const {name, email, password} = input 

        if (typeof name !== "string") {
            throw new BadRequestError ("'Name' deve ser uma string ")
        }

        if (typeof email !== "string") {
            throw new BadRequestError (" O'email' deve ser uma string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError (" 'Password' deve ser uma string")
        }

        const id = this.idGenerator.generate()
        const createAt = new Date().toISOString()
        const hashedPassword = await this.hashManager.hash(password)

        const newUser = new User (
            id,
            name,
            email,
            hashedPassword, 
            createAt
        )

        const userDB = newUser.ToDBModel()
        await this.userDatabase.insert(userDB)

        const payload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
        }

        const output: SignupOutput = {
            token: this.tokenManager.createToken(payload)
        }
        return output

    }

    public login = async ( input: LoginInput): Promise<LoginOutput> => {
        const {email, password} = input 
  
        if (typeof email !== "string") {
            throw new BadRequestError (" O'email' deve ser uma string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError (" 'Password' deve ser uma string")
        }

        const userDB = await this.userDatabase.findByEmail(email)

        if (!userDB) {
            throw new NotFoundError("Email invalido")
        }

    const isPasswordCorrect = await this.hashManager.compare(password, userDB.password)

    if (!isPasswordCorrect) {
        throw new NotFoundError ("Password invalido")
    }

    const users = new User (
        userDB.id,
        userDB.name,
        userDB.email,
        userDB.password,
        userDB.create_at
    )

    const payload: TokenPayload = {
        id: users.getId(),
        name: users.getName()
    }

    const token = this.tokenManager.createToken(payload)

    const output: LoginOutput = {
        token

    } 

    return output

    }
}