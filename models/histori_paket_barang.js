'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class histori_paket_barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: `uuid`,
        as:`barangToUser`
      })      // define association here
    }
  }
  histori_paket_barang.init({
    uuid: DataTypes.STRING,
    uuid_user: DataTypes.STRING,
    nama_kurir: DataTypes.STRING(50),
    no_wa_kurir: DataTypes.STRING(50),
    nama_penerima: DataTypes.STRING(50),
    tanggal_datang: DataTypes.DATE,
    tanggal_pengambilan: DataTypes.DATE,
    foto: DataTypes.STRING(50),
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'histori_paket_barang',
  });
  return histori_paket_barang;
};