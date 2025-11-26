import express from "express"
import cors from "cors"
import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config()

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

const database = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: 10
})

app.get("/", (request, response) => {
  const selectCommand = "SELECT name, email, age, nickname FROM brunamarques_02ta"
  
  database.query(selectCommand, (error, users) => {
    if (error) {
      console.log(error)
      return response.status(500).json({ error: "Erro no banco de dados" })
    }
    response.json(users)
  })
})

app.post("/login", (request, response) => {
   const{ email, password } = request.body.user

  const selectCommand = "SELECT * FROM brunamarques_02ta WHERE email = ?"

  database.query(selectCommand, [email], (error, user) => {
    if (error) {
      console.log(error)
      return
    }

    if (user.length === 0 || user[0].password !== password) {
      response.json({ message: "Email ou senha incorretos!" })
      return
    }

    response.json({
      id: user[0].id,
      name: user[0].name
    })
  })
})

app.post("/cadastrar", (request, response) => {
  const { name, email, age, nickname, password } = request.body

  const insertCommand = `
    INSERT INTO brunamarques_02ta(name, email, age, nickname, password)
    VALUES (?, ?, ?, ?, ?)
  `

  database.query(insertCommand, [name, email, age, nickname, password], (error) => {
    if (error) {
      console.log(error)
      return response.status(500).json({ error: "Erro ao cadastrar usuário" })
    }
    response.status(201).json({ message: "Usuário cadastrado com sucesso!" })
  })
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}!`)
})
