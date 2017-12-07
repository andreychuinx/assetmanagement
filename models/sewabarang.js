'use strict';
module.exports = (sequelize, DataTypes) => {
  var SewaBarang = sequelize.define('SewaBarang', {
    RequestBarangId: DataTypes.INTEGER,
    tgl_kembali: DataTypes.DATE,
    status_pinjam: DataTypes.INTEGER,
    status_barang: DataTypes.STRING
  });
  return SewaBarang;
};
