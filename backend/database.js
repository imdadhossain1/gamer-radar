const { Sequelize, DataTypes, DATE } = require('sequelize')

const { PG_HOST, PG_USER, PG_PW } = process.env

const sequelize = new Sequelize(`postgres://${PG_USER}:${PG_PW}@${PG_HOST}/gamer-radar`)

const genres = [
  "Sandbox",
  "Real-time strategy",
  "Shooters",
  "MOBA",
  "Role-playing",
  "Platformers",
  "Rhythm Games"
]

const Genres = sequelize.define('Genres', {
  name: {
    type: DataTypes.STRING
  },
  genreId: {
    type: DataTypes.BIGINT
  }
})

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING, // I am aware that Storing passwords as plain strings is usually a really bad idea
  },
  favoriteGameGenres: {
    type: DataTypes.ARRAY(DataTypes.BIGINT)
  },
  preferredFOC: {
    type: DataTypes.STRING
  },
  pastParties: {
    type: DataTypes.ARRAY(DataTypes.BIGINT)
  },
  intProfiles: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  }
})

const Threads = sequelize.define('Threads', {
  title: {
    type: DataTypes.STRING
  },
  author: {
    type: DataTypes.STRING
  }
})

const ThreadReplies = sequelize.define('ThreadReplies', {
  message: {
    type: DataTypes.STRING
  },
  toThread: {
    type: DataTypes.BIGINT
  },
  author: {
    type: DataTypes.STRING
  }
})

async function initDB() {
  try {
    await sequelize.authenticate()
    console.log('Connected to DB')
    console.log('Synced all database models')
  } catch (e) {
    console.error('Unable to Connect to DB', e)
  }
  await sequelize.sync({ alter: true });
  await Genres.destroy({ where: {}})
  genres.forEach(async(genre, i) => {
    await Genres.create({ name: genre, genreId: i })
  })
}

module.exports = {
  User,
  Threads,
  Genres,
  ThreadReplies,
  initDB 
}