const { Sequelize } = require('sequelize');
const sequelize = require('./config/connection');
require('dotenv').config();

const { v4: uuidv4 } = require('uuid');


const Employee = sequelize.define('employee', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    department: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    salary: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    Manager: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isManager: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
  });
  
  
  sequelize.sync();

  module.exports = { Employee }