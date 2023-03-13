import { UserBusiness } from "../business/UserBusiness";
import { BaseError } from "../errors/BaseError";
import { Request, Response } from "express";
import { LoginInput, SignupInput } from "../dtos/UserDTO";


export class UserController {
    constructor (
        private userBusiness: UserBusiness
    ){}

    public signup = (req: Request, res: Response) => {
        try {
            const input: SignupInput = {
                name: req.body.name,
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

    public login = async (req: Request, res: Response) => {
        try {

            const input: LoginInput = {
                email: req.body.email,
                password: req.body.password
            }

            const output = await this.userBusiness.login(input)
            
            }catch (error) {
                if(error instanceof BaseError){
                    res.status(error.statusCode).send(error.message)
                } else {
                    res.status(500).send("Erro inesperado")
                }
            }
    }
}