import express from "express"
import cors from "cors"
import { persons } from "./persons.js"

const app = express()
const port = 3333

app.use(cors())

//Get, POST, PUT, PATCH, DELETE
//CRUD -> Create, READ, UPDATE, DELETE

app.get("/", (request, response) => {
  response.json(persons)
}) // ← essa chave fecha a função corretamente!

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}!`)
})
