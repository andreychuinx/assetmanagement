const express = require('express')
const Router = express.Router()
const Model = require('../models')
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

Router.get('/', (req, res) => {
    Model.TempatBarang.findAll({
        attributes: ['id', 'quantity','isUpdated','updatedAt'],
        include: [Model.Barang, Model.Tempat]
    })
        .then(result => {
            
            res.render('reporthistory', {
                reporthistory: result,
                title: 'Report History',
                sidebar: 'report_history'
            })
        })
})



module.exports = Router;