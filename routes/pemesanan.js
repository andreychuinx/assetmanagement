const express   = require('express')
const Model     = require('../models')
const Sequelize = require('sequelize')
const Router    = express.Router()
const title     = 'Data Sewa Barang'

Router.get('/', (req, res) => {
  Model.RequestBarang.findAll({
    // where: {
    //   UserId: res.locals.userSession.id
    // },
    attributes: ['id', 'quantity', 'tgl_pinjam', 'approval'],
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
      barang      : barang,
      errMessage  : null,
    })
  })
})

Router.post('/add', (req, res) => {
  Model.Barang.findById(req.body.barang)
  .then((barang) => {
    if (barang != null) {
      Model.TempatBarang.findOne({
        where: {
          BarangId: req.body.barang
        }
      })
      .then((tempatbarang) => {
        if (tempatbarang.quantity >= req.body.quantity) {
          console.log(tempatbarang);
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
              errMessage  : `Quantity peminjaman melebihi dari quantity asset (${tempatbarang.quantity}) !!`,
            })
          })
        }
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
  Model.RequestBarang.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'BarangId', 'quantity', 'tgl_pinjam', 'approval'],
    order: ['tgl_pinjam'],
    include: [Model.Barang]
  })
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
  Model.TempatBarang.findOne({
    where: {
      BarangId: req.body.barang
    }
  })
  .then((tempatbarang) => {
    if (tempatbarang.quantity >= req.body.quantity) {
      let objPemesanan = {
        // id          : req.params.id,
        // UserId      : res.locals.userSession.id,
        BarangId    : req.body.barang,
        quantity    : req.body.quantity,
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
        Model.RequestBarang.findOne({
          where: {
            id: req.params.id
          },
          attributes: ['id', 'BarangId', 'quantity', 'tgl_pinjam', 'approval'],
          order: ['tgl_pinjam'],
          include: [Model.Barang]
        })
        .then(pemesanan => {
          Model.Barang.findAll()
          .then((barang) => {
            res.render('./pemesanan_add', {
              title       : title,
              sidebar     : 'pemesanan',
              pemesanan   : pemesanan,
              barang      : barang,
              errMessage  : err.message,
            })
          })
        })
      })
    } else {
      Model.RequestBarang.findOne({
        where: {
          id: req.params.id
        },
        attributes: ['id', 'BarangId', 'quantity', 'tgl_pinjam', 'approval'],
        order: ['tgl_pinjam'],
        include: [Model.Barang]
      })
      .then(pemesanan => {
        Model.Barang.findAll()
        .then((barang) => {
          res.render('./pemesanan_add', {
            title       : title,
            sidebar     : 'pemesanan',
            pemesanan   : pemesanan,
            barang      : barang,
            errMessage  : `Quantity peminjaman melebihi dari quantity asset (${tempatbarang.quantity}) !!`,
          })
        })
      })
    }
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
