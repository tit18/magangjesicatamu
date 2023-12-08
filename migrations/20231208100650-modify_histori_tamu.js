'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'histori_tamus',
        'no_wa_pengunjung',
        {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
      ),
      ]);
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('histori_tamus', 'no_wa_pengunjung')
    ]);
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
