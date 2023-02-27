const { Sequelize } = require('sequelize');
const sequelize = require('./config/connection');
require('dotenv').config();

const { v4: uuidv4 } = require('uuid');

const { Employee } = require("../models/employees");

const createEmployeesAndManagers = async (employees, managers) => {
    const createdManagers = await Employee.bulkCreate(managers);
  
    const employeesWithManagerIds = employees.map((employee, index) => {
      return {
        ...employee,
        ManagerId: createdManagers[index].id,
      };
    });
  
    await Employee.bulkCreate(employeesWithManagerIds);
  };
  
  module.exports = createEmployeesAndManagers;