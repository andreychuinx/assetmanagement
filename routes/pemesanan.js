const express   = require('express')
const Model     = require('../models')
const Sequelize = require('sequelize')
const Router    = express.Router()
const title     = 'Data Pemesanan Barang'

Router.get('/', (req, res) => {
  Model.RequestBarang.findAll({
    where: {
      UserId: res.locals.userSession.id
    },
    order: ['tgl_pinjam'],
    include: [Model.Barang]
  })
  .then(pemesanan => {
    res.render('./pemesanan', {
      title     : title,
      sidebar   : 'pemesanan',
      pemesanan : pemesanan,
    })
  })
})

Router.get('/add', (req, res) => {
  Model.Barang.findAll()
  .then((barang) => {
    res.render('./pemesanan_add', {
      title       : title,
      sidebar     : 'pemesanan',
      pemesanan   : false,
      barang     : barang,
      errMessage  : null,
    })
  })
})

Router.post('/add', (req, res) => {
  Model.Barang.findById(req.body.barang)
  .then((barang) => {
    if (barang != null) {
      let objPemesanan = {
        UserId      : res.locals.userSession.id,
        BarangId    : req.body.barang,
        quantity    : req.body.quantity,
        tgl_pinjam  : req.body.tgl_pinjam,
        approval    : 0,
        createdAt   : new Date(),
        updatedAt   : new Date(),
      }
      Model.RequestBarang.create(objPemesanan)
      .then(() => {
        res.redirect('/pemesanan')
      })
      .catch((err) => {
        Model.Barang.findAll()
        .then((barang) => {
          res.render('./pemesanan_add', {
            title       : title,
            sidebar     : 'pemesanan',
            pemesanan   : false,
            barang      : barang,
            errMessage  : err.message,
          })
        })
      })
    } else {
      Model.Barang.findAll()
      .then((barang) => {
        res.render('./pemesanan_add', {
          title       : title,
          sidebar     : 'pemesanan',
          pemesanan   : false,
          barang      : barang,
          errMessage  : 'Silahkan pilih barang !!',
        })
      })
    }
  })
  .catch(err => {
    Model.Barang.findAll()
    .then((barang) => {
      res.render('./pemesanan_add', {
        title       : title,
        sidebar     : 'pemesanan',
        pemesanan   : false,
        barang      : barang,
        errMessage  : err.message,
      })
    })
  })
})

Router.get('/edit/:id', (req, res) => {
  Model.RequestBarang.findById(req.params.id)
  .then(pemesanan => {
    Model.Barang.findAll()
    .then((barang) => {
      res.render('./pemesanan_add', {
        title       : title,
        sidebar     : 'pemesanan',
        pemesanan   : pemesanan,
        barang      : barang,
        errMessage  : null,
      })
    })
  })
})

Router.post('/edit/:id', (req, res) => {
  let objPemesanan = {
    id          : req.params.id,
    UserId      : userSession.id,
    BarangId    : req.body.barang,
    quantity    : req.body,quantity,
    tgl_pinjam  : req.body.tgl_pinjam,
    updatedAt   : new Date(),
  }
  Model.RequestBarang.update(objPemesanan, {
    where: {
      id: req.params.id,
    }
  })
  .then(() => {
    res.redirect('/pemesanan')
  })
  .catch(err => {
    Model.RequestBarang.findById(req.params.id)
    .then(pemesanan => {
      res.render('./tempat_add', {
        title       : title,
        sidebar     : 'pemesanan',
        pemesanan   : pemesanan,
        errMessage  : err.message,
      })
    })
  })
})

Router.get('/delete/:id', (req, res) => {
  Model.RequestBarang.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/pemesanan')
  })
})

module.exports = Router;
