const { Sequelize, DataTypes, DATE } = require('sequelize')

const { PG_HOST, PG_USER, PG_PW } = process.env

const sequelize = new Sequelize(`postgres://${PG_USER}:${PG_PW}@${PG_HOST}/gamer-radar`)

const Genres = sequelize.define('Genres', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
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
    type: DataTypes.ARRAY(DataTypes.STRING)
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
}

module.exports = {
  User,
  Threads,
  ThreadReplies,
  initDB 
}