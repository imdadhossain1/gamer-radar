const express = require('express')
const router = express.Router()

const { User } = require('./../database')

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  res.clearCookie();
  if(!username || !password) return res.status(400).send();
  const [user, created] =  await User.findOrCreate({ 
    where: {
      username,
    },
    defaults: {
      password
    }
  })
  console.log(created)
  if(created) {
    res.cookie('username', username)
    res.status(201).send()
  } else {
    res.status(409).send()
  }
})

router.post('/login', async(req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  if(!username || !password) return res.status(400).send();

  const user = await User.findOne({ where: { username, password }})
  if(user?.username) {
    res.cookie('username', username, { httpOnly: false })
    return res.status(200).send()
  } else {
    return res.status(404).send()
  }
})

module.exports = router;
