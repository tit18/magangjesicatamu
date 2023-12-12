'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.histori_tamu, {
        foreignKey: `uuid_user`,
        as: `userToTamu`
      })
      this.hasMany(models.histori_paket_barang, {
        foreignKey: `uuid_user`,
        as: `userToBarang`
      })
      // define association here
    }
  }
  user.init({
    uuid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nama: DataTypes.STRING(50),
    email: DataTypes.STRING(50),
    gender: DataTypes.STRING(50),
    no_tlp: DataTypes.STRING(50)
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};