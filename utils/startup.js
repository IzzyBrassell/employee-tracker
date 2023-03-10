const { Sequelize } = require('sequelize');
const sequelize = require('../config/connection');
require('dotenv').config();
const { Employee } = require('../models/employees')


const { v4: uuidv4 } = require('uuid');

const newManagers = [
    {
        id: uuidv4(),
        name: 'Anita Mann',
        title: 'Manager',
        department: 'Management',
        salary: 150000,
        isManager: true, 
    },
    {
        id: uuidv4(),
        name: 'Manny Laundering',
        title: 'Sales Manager',
        department: 'Sales',
        salary: 125000,
        isManager: true
    },
    {
        id: uuidv4(),
        name: 'Ben Dover',
        title: 'Engineering Manager',
        department: 'Engineering',
        salary: 120000,
        isManager: true
    },
    {
        id: uuidv4(),
        name: 'Nick O. Teen',
        title: 'HR/Union Rep',
        department: 'Service',
        salary: 115000,
        isManager: true
    }
]


const starterEmployees = [
    {
        name: 'Annie Position',
        title: 'Secretary',
        department: 'Service',
        salary: 50000,
        ManagerId: newManagers[0].id
    },
    {
        name: 'Betty Humpter',
        title: 'Engineer',
        department: 'Engineering',
        salary: 82000,
        ManagerId: newManagers[2].id
    },
    {
        name: 'Kareem O. Weet',
        title: 'Salesman',
        department: 'Sales',
        salary: 75000,
        ManagerId: newManagers[1].id
    },
    {
        name: 'May I. Tutchem',
        title: 'Customer Service Rep',
        department: 'Service',
        salary: 38000,
        ManagerId: newManagers[3].id
    },
]

startup = (starterEmployees, newManagers)

module.exports = startup