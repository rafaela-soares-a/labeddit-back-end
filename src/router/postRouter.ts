import { PostsBusiness } from "../business/PostBusiness"
import { PostController } from "../controller/PostController"
import { PostDatabase } from "../database/PostDatabase"
import { IdGenerator } from "../services/idGenerator"
import { TokenManager } from "../services/TokeManager"
import express from "express"

export const postRouter = express.Router()

const postController = new PostController (
    new PostsBusiness (
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

postRouter.get("/", postController.getPost)