import express from 'express'
import cors from 'cors'

import dontev from "dotenv"

dontev.config()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT), () => {
    console.log(`Servidor rodando na porta ${process.env.port}`)
})