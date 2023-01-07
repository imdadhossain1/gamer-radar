require("dotenv").config() // Load environment variables from .env | PG_HOST = host:port | PG_USER | PG_PW(password)

const express = require('express')
const http = require('http');
const { initDB } = require('./database');

const authRouter = require('./routes/auth.js')

const app = express()
const server = http.createServer(app)

const sio = require('socket.io')(server)

app.use('/auth', authRouter)

server.listen(3001)
initDB()
