'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('histori_tamus', {
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
      nama_pengunjung: {
        type: Sequelize.STRING(50)
      },
      asal_instansi: {
        type: Sequelize.STRING(50)
      },
      nama_dituju: {
        type: Sequelize.STRING(50)
      },
      keperluan: {
        type: Sequelize.STRING(50)
      },
      jumlah_tamu: {
        type: Sequelize.INTEGER(50)
      },
      janjian: {
        type: Sequelize.STRING(50)
      },
      tanggal_masuk: {
        type: Sequelize.DATE
      },
      tanggal_keluar: {
        type: Sequelize.DATE
      },
      foto: {
        type: Sequelize.STRING(50)
      },
      testimoni: {
        type: Sequelize.TEXT
      },
      ditemui_oleh: {
        type: Sequelize.STRING(50)
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
    await queryInterface.dropTable('histori_tamus');
  }
};