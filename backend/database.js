const { Sequelize, DataTypes } = require('sequelize')

const { PG_HOST, PG_USER, PG_PW } = process.env

const sequelize = new Sequelize(`postgres://${PG_USER}:${PG_PW}@${PG_HOST}/gamer-radar`)

const Genres = sequelize.define('Genres', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: DataTypes.STRING,
  allowNull: false
})

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING, // I am aware that Storing passwords as plain strings is usually a really bad idea
    allowNull: false
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
    type: DataTypes.ARRAY(DataTypes.BIGINT)
  }
})

module.exports.initDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to DB')
    
  } catch (e) {
    console.error('Unable to Connect to DB', e)
  }
}
