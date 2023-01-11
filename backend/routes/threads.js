const express = require('express')
const router = express.Router()

const { Threads, ThreadReplies } = require('../database')

module.exports = 
router
  .post('/', async(req, res) => {
    const { title } = req.body;
    const thread = await Threads.create({ title, author: req.cookies.username })
    

    const t = await Threads.findAll();
    console.log(t)

    res.status(201)
    res.json(JSON.stringify({ title, id: thread.id}));
  })
  .get('/', async(req, res) => {
    const threads = await Threads.findAll();
    res.status(200)
    res.json(JSON.stringify({ threads }))
  })
  .get('/:id', async(req, res) => {
    const id = req.params.id
    const thread = await Threads.findOne({ where: { id: id }})
    const replies = await ThreadReplies.findAll({ where: { toThread: id }})
    res.status(200)
    res.json(JSON.stringify({ title: thread.title, replies }))
  })
  .delete('/', async(req, res) => {
    const { id } = req.body

    await Threads.destroy({ where: { id }})
    res.status(200).send()
  })
  .patch('/', async(req, res) => {
    const { id, title } = req.body

    await Threads.update({ title }, { where: { id }})
    res.send(200)
  })
  .post('/:threadId', async(req, res) => {
    const { message } = req.body
    const { threadId } = req.params
    console.log('test')
    const reply = await ThreadReplies.create({ message: message, toThread: threadId, author: req.cookies.username })
    req.io.to(threadId).emit('reply', reply)
  })