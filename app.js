const inquirer = require('inquirer');
const express = require('express');
const sequelize = require('./config/connection');
require('dotenv').config();
const { Employee } = require('models/employees')
const { createEmployeesAndManagers } = require('utils/create')
const startup = require('uitls/startup')

const app = express()

createEmployeesAndManagers(startup);

const PORT = process.env.PORT || 5203


