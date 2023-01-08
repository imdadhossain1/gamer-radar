require("dotenv").config() // Load environment variables from .env | PG_HOST = host:port | PG_USER | PG_PW(password)

const express = require('express')
const http = require('http');
const { initDB } = require('./database');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express()
const server = http.createServer(app)

const sio = require('socket.io')(server)

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/auth', authRouter)
app.use('/user', userRouter)

server.listen(3001)
initDB()
