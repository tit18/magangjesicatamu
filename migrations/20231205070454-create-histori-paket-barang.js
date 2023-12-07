'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('histori_paket_barangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      uuid_user: {
        type: Sequelize.STRING,
        references: {
          model: "users",
          key: "uuid"
        }
      },
      nama_kurir: {
        type: Sequelize.STRING(50)
      },
      no_wa_kurir: {
        type: Sequelize.STRING(50)
      },
      nama_penerima: {
        type: Sequelize.STRING(50)
      },
      tanggal_datang: {
        type: Sequelize.DATE
      },
      tanggal_pengambilan: {
        type: Sequelize.DATE
      },
      foto: {
        type: Sequelize.STRING(50)
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('histori_paket_barangs');
  }
};