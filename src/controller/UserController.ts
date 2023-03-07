import { UserBusiness } from "../business/UserBusiness";
import { BaseError } from "../errors/BaseError";
import { Request, Response } from "express";
import { SignupInput } from "../dtos/UserDTO";


export class UserController {
    constructor (
        private userBusiness: UserBusiness
    ){}

    public signup = (req: Request, res: Response) => {
        try {
            const input: SignupInput = {
                apelido: req.body.apelido,
                email: req.body.email,
                password: req.body.password
            }

           const output = this.userBusiness.signup(input)
           res.status(201).send(output)
            
        } catch (error) {
            if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}