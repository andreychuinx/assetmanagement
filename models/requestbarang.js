'use strict';
module.exports = (sequelize, DataTypes) => {
  var RequestBarang = sequelize.define('RequestBarang', {
    UserId: DataTypes.INTEGER,
    BarangId: {
      type: DataTypes.INTEGER,
      customValidation: function(value, next) {
        if (value == '0' || value == 0) {
          next('Silahkan pilih barang !!')
        } else {
          next()
        }
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric : {
          msg : 'Data yang di input bukan angka (0-9) !!'
        },
        customValidation: function(value, next) {
          if (value == '' || value == '0' || value == 0) {
            next('Silahkan masukkan jumlah barang !!')
          } else {
            next()
          }
        },
      }
    },
    tgl_pinjam: {
      type: DataTypes.DATE,
      // validate: {
      //   customValidation: function(value, next) {
      //     let now = new Date()
      //     let dateNow = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      //     let dateInput = new Date(value.getFullYear(), value.getMonth(), value.getDate())
      //
      //
      //     console.log(dateInput <= dateNow);
      //     console.log('dateInput: ' + dateInput + ' ||| dateNow: ' + dateNow);
      //
      //     // let dateInput = new Date(value.getDate(), )
      //     // var anotherDate = new Date(value.toISOString())
      //     // let result = isFinite(value = this.convert(value).valueOf()) && isFinite(dateNow = this.convert(dateNow).valueOf()) ? (value > dateNow)-(value < dateNow) : NaN
      //
      //     // console.log(anotherDate);
      //     // console.log('valueee: ' + value, typeof value);
      //     // console.log('dateNow: ' + dateNow);'dateInput: ' +
      //     // console.log(value >= dateNow);
      //     // console.log(value + ' == ' + dateNow);
      //
      //
      //   }
      // }
    },
    approval: DataTypes.INTEGER,
    keterangan: DataTypes.STRING
  });

  RequestBarang.associate = function (models) {
    RequestBarang.belongsTo(models.Barang)
  }

  return RequestBarang;
};
