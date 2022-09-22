'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AddPortfolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AddPortfolio.init({
    category: DataTypes.STRING,
    projectName: DataTypes.STRING,
    Tstack: DataTypes.STRING,
    Llink: DataTypes.STRING,
    Dlink: DataTypes.STRING,
    Ldate: DataTypes.STRING,
    Isapp: DataTypes.STRING,
    psl: DataTypes.STRING,
    asl: DataTypes.STRING,
    desc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AddPortfolio',
  });
  return AddPortfolio;
};