require("dotenv").config() // Load environment variables from .env | PG_HOST = host:port | PG_USER | PG_PW(password)

const express = require('express')
const http = require('http');
const { initDB } = require('./database');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors')

const app = express()
const server = http.createServer(app)

const sio = require('socket.io')(server)

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth', authRouter)
app.use('/user', userRouter)

server.listen(3001)
initDB()
