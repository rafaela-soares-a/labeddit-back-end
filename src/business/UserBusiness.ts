import { UserDatabase } from "../database/UserDatabase";
import { SignupInput, SignupOutput } from "../dtos/UserDTO";
import { BadRequestError } from "../errors/BadRequestError";
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
        const {apelido, email, password} = input 

        if (typeof apelido !== "string") {
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
            apelido,
            email,
            hashedPassword, 
            createAt
        )

        const userDB = newUser.ToDBModel()
        await this.userDatabase.insert(userDB)

        const payload: TokenPayload = {
            id: newUser.getId(),
            apelido: newUser.getApelido(),
        }

        const output: SignupOutput = {
            token: this.tokenManager.createToken(payload)
        }
        return output

    }
}