const express = require('express')
const router = express.Router()

const { User, Genres } = require('../database')

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

router.get('/:username', async(req, res) => {
  const user = await User.findOne({ where: { username: req.params.username }})
  // .then(async(user1) => {
  //   let newArray;

  //   if(user1.intProfiles?.[0] != req.params.username) {
  //     if(user1.intProfiles?.length == 15) {
  //       user1.intProfiles.pop();
  //       user1.intProfiles.unshift([...user.username]) 
  //       await User.update({ intProfiles: newArray }, { where: { username: req.cookies.username }})
  //     } else if(user1.intProfiles?.length >= 1) {
  //       user1.intProfiles.unshift([user.username])
  //       await User.update({ intProfiles: user.intProfiles }, { where: { username: req.cookies.username } })
  //     } else if (user1.intProfiles == null) {
  //       await User.update({ intProfiles: [req.params.username] }, { where: { username: req.cookies.username }})
  //     }
  //   }
  // })

  if(user == null) {
    return res.status(404).send()
  } else {
    delete user.dataValues['password']
    const availableGenres = await Genres.findAll();

    if(req.cookies.username != user.dataValues.username) {
          User.findOne({ where: { username: req.cookies.username }})
      .then(async u => {

        let array = [];


        console.log(u.intProfiles)
        if(u.intProfiles == null || !u.intProfiles?.length) {
          array = [user.dataValues.username]
        } else {
          if(u.intProfiles.length > 0 && u.intProfiles.length < 15) {
            console.log(u.intProfiles)
            let prfInd = u.intProfiles.findIndex(v => v == user.dataValues.username);
            if(prfInd != -1) {
              array = [user.dataValues.username, ...u.intProfiles.filter(prf => prf != u.intProfiles[prfInd])]
            } else {
              array = [user.dataValues.username, ...u.intProfiles]
            }
          }
          if(u.intProfiles.length == 15) {
            let prfInd;
            if(prfInd = u.intProfiles.findIndex(v => v == user.dataValues.username) != -1) {
              array = [user.dataValues.username, ...u.intProfiles.filter(prf => prf != u.intProfiles[prfInd])]
            } else {
              u.intProfiles.pop()
              array = [user.dataValues.username, ...u.intProfiles]
            }
          }
        }
        await User.update({ intProfiles: array }, { where: { username: req.cookies.username }})
      })
    }

    user.dataValues.availableGenres = availableGenres.map((v) => {
      return { genreId: v.dataValues.genreId, name: v.dataValues.name }
    })
    return res.status(200).json(JSON.stringify(user.dataValues))
  }
})

router.patch('/', async(req, res) => {
  const { favoriteGameGenres, preferredFOC } = req.body

  await User.update({ favoriteGameGenres, preferredFOC }, { where: { username: req.cookies.username }}) 
  res.status(200).send()
})

module.exports = router