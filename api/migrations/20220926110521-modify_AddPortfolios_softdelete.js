'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'AddPortfolios', // table name
        'softdelete', // new field name
        {
          type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        },
        
      ),
    ]);
    {
      paranoid: true
   };
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'linkedin'),
    ]);
  }
};
