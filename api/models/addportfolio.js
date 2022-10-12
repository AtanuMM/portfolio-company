'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize} = require("sequelize");

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
    category:{
      type: Sequelize.JSON
    },
    industry:{
      type: Sequelize.JSON
    },
    projectName: DataTypes.STRING,
    Tstack1:{
      type: Sequelize.JSON
    },
    Llink: DataTypes.STRING,
    Dlink: DataTypes.STRING,
    Wdate: DataTypes.STRING,
    Credential: DataTypes.STRING,
    Tstack2:{
      type: Sequelize.JSON
    },
    psl: DataTypes.STRING,
    psldate: DataTypes.STRING,
    asl: DataTypes.STRING,   
    asldate: DataTypes.STRING,
    desc: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
    deletedAt:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'AddPortfolio',
  });
  return AddPortfolio;
};