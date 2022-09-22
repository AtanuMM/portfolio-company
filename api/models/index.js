'use strict';
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require("sequelize");
const basename = path.basename(__filename);
const ENVIRONMENT = process.env.NODE_ENV || 'development';
const config = require("../config/config")[ENVIRONMENT];
const db = {};

let sequelize;

sequelize = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	port: config.port,
	dialect: config.dialect,
	logging: console.log,
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
       Sequelize.DataTypes,
       );
    
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const connectDatabase = async () => {
	try {
		await sequelize.authenticate();

		console.log("Database connected successfully");
	} catch (e) {
		console.log("Database Connection failure");
		console.log(e);
	}
};


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = { db, connectDatabase };
