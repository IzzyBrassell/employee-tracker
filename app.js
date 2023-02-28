const inquirer = require('inquirer');
const express = require('express');
const sequelize = require('./config/connection.js');
require('dotenv').config();
const { Employee } = require('./models/employees.js')
const { createEmployeesAndManagers } = require('./utils/create')
const startup = require('./utils/startup')

const app = express()



const PORT = process.env.PORT || 5203


const getDepartments = async () => {
  const departments = await Employee.findAll({
    attributes: [[sequelize.literal('DISTINCT `department`'), 'department']],
    raw: true,
  });
  return departments.map((department) => department.department);
};

const getManagers = async () => {
    const managers = await Employee.findAll({
      where: { isManager: true },
      attributes: ['id', 'name'],
    });
    return managers.map(({ id, name }) => ({ name, value: id }));
  };




const startMenu = async () => {
    const { choice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
          { name: 'View all employees', value: 'view_employees' },
          { name: 'View all managers', value: 'view_managers' },
          { name: 'Add a new employee', value: 'add_employee' },
          { name: 'Add a new manager', value: 'add_manager' },
          { name: 'view all Job Titles', value: 'view_titles' },
          { name: 'View by department', value: 'view_departments' },
          { name: 'Add a Department', value: 'add_department'},
          { name: 'Fire an Employee', value:'delete_employee' },
          { name: 'Exit', value: 'exit' },
        ],
      },
    ]);
  
    switch (choice) {
        case 'view_employees':
          const employees = await Employee.findAll();
          console.log(employees);
          break;
        case 'view_managers':
          const managers = await Employee.findAll({
            where: { isManager: true }
          });
          console.log(managers);
          break;
          case 'add_employee':
          const { employeeName, employeeTitle, employeeDepartment, employeeSalary, employeeManager } = await inquirer.prompt([
            {
              type: 'input',
              name: 'employeeName',
              message: 'What is the employee\'s name?',
              validate: (input) => {
                if (!input) {
                  return 'Please enter a name.';
                }
                return true;
              },
            },
            {
              type: 'input',
              name: 'employeeTitle',
              message: 'What is the employee\'s job title?',
              validate: (input) => {
                if (!input) {
                  return 'Please enter a job title.';
                }
                return true;
              },
            },
            {
              type: 'list',
              name: 'employeeDepartment',
              message: 'What department does the employee work in?',
              choices: [...getDepartments(), { name: 'Add a new department', value: 'add_department' }],
              validate: (input) => {
                if (!input) {
                  return 'Please select a department.';
                }
                return true;
              },
            },
            {
              type: 'input',
              name: 'employeeSalary',
              message: 'What is the employee\'s salary?',
              validate: (input) => {
                if (!input) {
                  return 'Please enter a salary.';
                }
                if (isNaN(input)) {
                  return 'Salary must be a number.';
                }
                return true;
              },
            },
            {
              type: 'list',
              name: 'employeeManager',
              message: 'Who is the employee\'s manager?',
              choices: [...getManagers(), { name: 'None', value: null }],
              validate: (input) => {
                if (!input) {
                  return 'Please select a manager.';
                }
                return true;
              },
            },
          ]);
        
          // code to save employee to database
          await Employee.create({
            name: employeeName,
            title: employeeTitle,
            department: employeeDepartment,
            salary: employeeSalary,
            ManagerId: employeeManager
          });
        
          console.log(`Successfully added ${employeeName} as an Employee.`);
          break;
         
          case 'add_manager':
            const { managerName, managerTitle, managerDepartment, managerSalary } = await inquirer.prompt([
              {
                type: 'input',
                name: 'managerName',
                message: 'What is the manager\'s name?',
              },
              {
                type: 'input',
                name: 'managerTitle',
                message: 'What is the manager\'s job title?',
              },
              {
                type: 'list',
                name: 'managerDepartment',
                message: 'What department does the manager work in?',
                choices: [...await getDepartments(), { name: 'Add a new department', value: 'add_department' }],
              },
              {
                type: 'input',
                name: 'managerSalary',
                message: 'What is the manager\'s salary?',
                validate: function (input) {
                  if (isNaN(input)) {
                    return 'Please enter a valid number.';
                  } else {
                    return true;
                  }
                }
              }
            ]);
          
            await Employee.create({
              name: managerName,
              title: managerTitle,
              department: managerDepartment,
              salary: managerSalary,
              isManager: true,
              ManagerId: null
            });
          
            console.log(`Successfully added ${managerName} as a manager.`);
            break;
          case 'view_titles':
            const titles = await Employee.findAll({
              attributes: [sequelize.literal('DISTINCT `title`')]
            });
            console.log(titles);
            break;
            case 'view_departments':
                const departments = await Employee.findAll({
                  attributes: [sequelize.literal('DISTINCT `department`')]
                });
                const { department } = await inquirer.prompt([
                  {
                    type: 'list',
                    name: 'department',
                    message: 'Which department would you like to view?',
                    choices: departments.map((d) => d.department),
                  },
                ]);
                const employeesByDepartment = await Employee.findAll({
                  where: { department },
                });
                console.log(employeesByDepartment);
                break;
                case 'add_department':
                const { departmentName } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'departmentName',
                        message: 'What is the name of the new department?',
                    },
                ]);
                await Employee.update(
                    { department: departmentName },
                    { where: { department: null } }
                );
                console.log(`Department "${departmentName}" added successfully!`);
                break;
                case 'delete_employee':
                    const employeesToDelete = await Employee.findAll();
                    const { employee } = await inquirer.prompt([
                    {
                         type: 'list',
                        name: 'employee',
                         message: 'Which employee would you like to delete?',
                        choices: employeesToDelete.map((e) => ({
                          name: `${e.name} (${e.title})`,
                        value: e.id,
                        })),
                        },
                         ]);
                        await Employee.destroy({ where: { id: employee } });
                        console.log(`Employee ${employee} deleted successfully!`);
                  break;
        
                case 'exit':
        console.log('hit control+c to exit')
    }
  
    // prompt again after action is completed
    startMenu();
  };

  try{
    createEmployeesAndManagers(startup);
    startMenu();} catch (error) {
        console.log(error)
    }
  
  // start the server and prompt the user
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`); 
  });
