const inquirer = require('inquirer');
const express = require('express');
const Sequelize = require('sequelize');
require('dotenv').config
const sequelize = new Sequelize(process.env.MYSQL_LOGIN)

const app = express()

const Employee = sequelize.define('employee', {
    name: Sequelize.STRING,
    jobTitle: Sequelize.STRING,
    department: Sequelize.STRING,
    salary: Sequelize.FLOAT,
    manager: Sequelize.STRING
  });