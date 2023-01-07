const { Sequelize, DataTypes } = require('sequelize')

const { PG_HOST, PG_USER, PG_PW } = process.env

const sequelize = new Sequelize(`postgres://${PG_USER}:${PG_PW}@${PG_HOST}/gamer-radar`)

module.exports.initDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to DB')
  } catch (e) {
    console.error('Unable to Connect to DB', e)
  }
}