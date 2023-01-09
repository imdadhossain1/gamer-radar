const express = require('express')
const router = express.Router()

const { User } = require('../database')

router.use('/', async (req, res, next) => {
  console.log(req.cookies)
  if(!req.cookies.username) {
    return res.status(403).send()
  } else {
    User.findOne({ where: { username: req.cookies.username }})
    .then(async user => {
      if(user == null) {
        return res.status(403).send()
      } else {
        next()
      }
    })
  }
})

let array = []

array.unshift

router.get('/:username', async(req, res) => {
  const user = await User.findOne({ where: { username: req.params.username }})
  User.findOne({ where: { username: req.cookies.username }})
  .then(async(user1) => {
    let newArray;

    if(user1.intProfiles?.[0] != req.params.username) {
      if(user1.intProfiles?.length == 15) {
        user1.intProfiles.pop();
        user1.intProfiles.unshift([...user.username]) 
        await User.update({ intProfiles: newArray }, { where: { username: req.cookies.username }})
      } else if(user1.intProfiles?.length >= 1) {
        user1.intProfiles.unshift([user.username])
        await User.update({ intProfiles: user.intProfiles }, { where: { username: req.cookies.username } })
      } else if (user1.intProfiles == null) {
        await User.update({ intProfiles: [req.params.username] }, { where: { username: req.cookies.username }})
      }
    }
  })

  if(user == null) {
    return res.status(404).send()
  } else {
    delete user.dataValues['password']
    return res.status(200).json(JSON.stringify(user.dataValues))
  }
})

router.patch('/', async(req, res) => {
  const { favoriteGameGenres, preferredFOC } = req.body

  await User.update({ favoriteGameGenres, preferredFOC }, { where: { username: req.cookies.username }}) 
  res.status(200).send()
})

module.exports = router