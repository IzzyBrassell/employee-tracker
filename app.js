const inquirer = require('inquirer');
const express = require('express');
const sequelize = require('./config/connection');
require('dotenv').config();
const { Employee } = require('models/employees')

const app = express()

const PORT = process.env.PORT || 5203


