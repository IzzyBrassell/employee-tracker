const inquirer = require('inquirer');
const express = require('express');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:password@127.0.0.1:3306/employees_db')

const Employee = sequelize.define('employee', {
    name: Sequelize.STRING,
    jobTitle: Sequelize.STRING,
    department: Sequelize.STRING,
    salary: Sequelize.FLOAT,
    manager: Sequelize.STRING
  });