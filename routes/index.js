const express = require('express')
, Router = express.Router()
, Model = require('../models')

Router.get('/', (req, res) => {
  let totalUser = 0
  let totalTempat = 0

  Model.User.count()
  .then(countUser => {
    Model.Tempat.count()
    .then(countTempat => {
      res.render('index', {
        title         : 'Inventory App',
        sidebar       : 'dashboard',
        totalUser     : countUser,
        totalTempat   : countTempat,
      })
    })
  })
})

module.exports = Router;
