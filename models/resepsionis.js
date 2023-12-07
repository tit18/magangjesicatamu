'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class resepsionis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  resepsionis.init({
    uuid: {
      type:DataTypes.STRING,
      primaryKey: true
    },
    nama: DataTypes.STRING(50),
    email: DataTypes.STRING(50),
    gender: DataTypes.STRING(50),
    no_tlp: DataTypes.STRING(50),
    password: DataTypes.STRING(255),
    role: DataTypes.ENUM('SATPAM', 'RESEPSIONIS')
  }, {
    sequelize,
    modelName: 'resepsionis',
  });
  return resepsionis;
};