'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('resepsionis', {
      
      uuid: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      nama: {
        type: Sequelize.STRING(50)
      },
      email: {
        type: Sequelize.STRING(50)
      },
      gender: {
        type: Sequelize.STRING(50)
      },
      no_tlp: {
        type: Sequelize.STRING(50)
      },
      password: {
        type: Sequelize.STRING(255)
      },
      role: {
        type: Sequelize.ENUM('SATPAM','RESEPSIONIS')
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
    await queryInterface.dropTable('resepsionis');
  }
};