'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class histori_tamu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: `uuid`,
        as:`tamuToUser`
      })      // define association here
    }
  }
  histori_tamu.init({
    uuid: DataTypes.STRING,
    uuid_user: DataTypes.STRING,
    nama_pengunjung: DataTypes.STRING(50),
    asal_instansi: DataTypes.STRING(50),
    nama_dituju: DataTypes.STRING(50),
    keperluan: DataTypes.STRING(50),
    jumlah_tamu: DataTypes.INTEGER(50),
    janjian: DataTypes.STRING(50),
    tanggal_masuk: DataTypes.DATE,
    tanggal_keluar: DataTypes.DATE,
    foto: DataTypes.STRING(50),
    testimoni: DataTypes.TEXT,
    ditemui_oleh: DataTypes.STRING(50)
  }, {
    sequelize,
    modelName: 'histori_tamu',
  });
  return histori_tamu;
};