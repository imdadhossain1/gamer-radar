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
  .then(async(user) => {
    let newArray;
    if(user.intProfiles?.length == 15) {
      if(user.intProfiles[0] != user.username) {
        user.intProfiles.pop();
        user.intProfiles.unshift([...user.username]) 
        await User.update({ intProfiles: newArray }, { where: { username: req.cookies.username }})
      }
    } else {
      if(user.intProfiles?.length >= 1 && user.intProfiles[0]?.username == req.cookies.username) {
        user.intProfiles.unshift([user.username])
        await User.update({ intProfiles: user.intProfiles }, { where: { username: req.cookies.username } })
      }  
    }
  })

  if(user == null) {
    return res.status(404).send()
  } else {
    delete user.dataValues['password']
    return res.status(200).json(user.dataValues)
  }
})

module.exports = router