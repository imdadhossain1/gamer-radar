require("dotenv").config() // Load environment variables from .env | PG_HOST = host:port | PG_USER | PG_PW(password)

const express = require('express')
const http = require('http');
const { initDB } = require('./database');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user')
const threadsRouter = require('./routes/threads')

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors')

const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)

const sio = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

sio.on('connection', async (socket) => {
  console.log(socket.handshake.query['id'])
  socket.join(`${socket.handshake.query['id']}`)
  socket.on('test', console.log)
})

app.use(async(req, res, next) => {
  req.io = sio;
  next()
})

app.use(
  cors({
    origin: 'http://localhost:3000',
    allowedHeaders: 'Content-Type',
    credentials: true
  })
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/threads', threadsRouter)

server.listen(3001)
initDB()
