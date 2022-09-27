'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AddPortfolios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      projectName: {
        type: Sequelize.STRING
      },
      Tstack: {
        type: Sequelize.STRING
      },
      Llink: {
        type: Sequelize.STRING
      },
      Dlink: {
        type: Sequelize.STRING
      },
      Ldate: {
        type: Sequelize.STRING
      },
      Isapp: {
        type: Sequelize.STRING
      },
      psl: {
        type: Sequelize.STRING
      },
      asl: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
  },
);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AddPortfolios');
  }
};