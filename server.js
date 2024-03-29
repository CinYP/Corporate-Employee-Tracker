//________ modules _________
//import mysql
const mysql = require('mysql2');

//import inquirer
const inquirer = require('inquirer'); 

//import internal connection 
//const connection = require('./db/connection');


//import console.table
const cTable = require('console.table'); 
const dbAccess = require('./db/dbaccess');

// const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     port: 3306, 
//     user: 'root',
//     database: 'employee_db',
//     password: 'Lily_ivy' 
// });

// //Connection ID
// connection.connect((err)=>{
//     if (err) {
//         console.log(err)
//         console.log('Something went wrong.')
//     } welcomeMessage();
// });

const welcomeMessage = () => {
    console.log('=================================')
    console.log('|| EMPLOYEE MANAGER STARTED    ||')
    console.log('=================================')
    startApp(); 
};

const startApp = () => {
    inquirer.prompt([
        {
            type:'list',
            name:'choices', 
            message:'Welcome! What would you like to initiate?',
            choices:[
                'View all departments', 
                'View all roles', 
                'View all employees', 
                'View all employees by department', 
                'Add a department', 
                'Add a role', 
                'Add an Employee', 
                'Update an employee role',
                'Nothing. Maybe later.'
            ]
        }])
     .then((answers)=>{
        const {choices} = answers; 

        if (choices === 'View all departments'){
            showDepartments();
        }
        else if (choices === 'View all roles'){
            showRoles();
        }
        else if (choices === 'View all employees'){
            showEmployees(); 
        }
        else if (choices === 'View all employees by department'){
            showEmployeeDepartment();  
        }
        else if (choices === 'Add a department'){
            addDepartment(); 
        }
        else if (choices === 'Add a role'){
            addRole();
        }
        else if (choices === 'Add an Employee'){
            addEmployee(); 
        }
        else if (choices === 'Update an employee role'){
            updateEmployee(); 
        }
        else {
            endApplication();
        }
    });

};

showDepartments = () => {
    console.log('...Showing all Departments...');
        //Select department names and department id from departments table 
        connection.query('SELECT department.id AS id, department.name as department FROM department', 
        
        function (err,rows) {
          if (err) throw err;
          console.table(rows);
        //restarting prompt from user
        startApp(); 
        });
    };

    showRoles = () => {
        console.log('...Showing all roles...');
        //Select roles from mysql 
        connection.query(`SELECT role.id, role.title, department.name AS department FROM role
        INNER JOIN department ON role.department_id = department.id`, 
        
        function (err,rows) {
        if (err) throw err;
          console.table(rows);
        //restarting prompt from user
        startApp(); 
        });
    };

    showEmployees =() => {
        console.log('...Showing all Employees...');
        connection.query(`SELECT employee.id,
                            employee.first_name,
                             employee.last_name,
                             role.title,
                             role.salary,
                             department.name AS department,
                             CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                             
                             FROM employee 
                             LEFT JOIN role on employee.role_id = role.id
                             LEFT JOIN department on role.department_id = department.id
                             LEFT JOIN employee manager on employee.manager_id = manager.id;
                             `,

        function (err,rows) {
          if (err) throw err;
          console.table(rows);
        
      //  restarting prompt from user
        startApp(); 
        // dbAccess.fetchAllEmployees()
        // .then(([rows]) => {
        //  let employees = rows;
        //  console.log("\n");
        //  console.table(employees);
    })
    .then(() => startApp());
        // });
    };

    //come back to this
    showEmployeeDepartment = () => {
        console.log('...Showing all Employees By Department...');
        connection.query(`SELECT employee.first_name, employee.last_name FROM employee
                         INNER JOIN department ON employee.department_id = department.id

        `, 
        function (err,rows) {
          if (err) throw err;
          console.table(rows);
        //restarting prompt from user
        startApp(); 
        }); 
    }

    addDepartment = () => {
        inquirer.prompt([
            {
                type: 'input', 
                name: 'addDepartment', 
                message: 'What department would you like to add?', 
                validate: (addADepartment) => {
                    if (addADepartment) {
                        return true; 
                    } else {
                        console.log('Please enter a valid department name');
                        return false;
                    }
                }
            }
        ]).then(answer =>{
            connection.query(`INSERT INTO department (name) VALUES (?)`, answer.addDepartment,
            function (err,rows) {
                if (err) throw err;   
                console.table(rows);
                console.log(`Added ${answer.addDepartment} to Deparment database.`);
            })
         showDepartments()
        })
    };
      
//come back to this - you have a syntax error 
    addRole = () => {
        console.log('....Add Role....');
        inquirer.prompt([
            {
                type: 'input', 
                name: 'addRole', 
                message: 'What role would you like to add?', 
                validate: (addARole) => {
                    if (addARole) {
                        return true; 
                    } else {
                        console.log('Please enter a valid role.');
                        return false;
                    }
                }
            },
            {
                type: 'input', 
                name: 'roleSalary', 
                default: 50000, 
                message: 'What is the salary for this role?', 
                validate: (salaryAdd) => {
                    if (salaryAdd) {
                        return true; 
                    } else {
                        console.log('Please enter a valid salary.');
                        return false;
                    }
                }
            },
            {
                type: 'input', 
                name: 'roleDepartmentID', 
                default: 1, 
                message: 'What is the department ID for this role?', 
                validate: (departmentIDAdd) => {
                    if (departmentIDAdd) {
                        return true; 
                    } else {
                        console.log('Please enter a valid role.');
                        return false;
                    }
                }
            }
        ]).then(answer =>{
            console.log(answer)
            connection.promise().query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, [answer.addRole, answer.roleSalary, answer.roleDepartmentID],
            function (err,rows) {
                if (err) throw err;
                 console.table(rows)
                 console.log(`Added ${answer.addRole} to role database.`)
            }).then( ()=>{
            showRoles()
        })
        })
    };

    addEmployee = () => {
        console.log('....Adding an Employee');
        inquirer.prompt([
           { type: 'input',
           name: 'first_name',
           message: 'What is the first name of the employee?',
        //    validate: (addFirstName) => {
        //     if (addFirstName) {
        //         return true; 
        //     } else {
        //         console.log('Please enter a valid role.');
        //         return false;
        //     }}
           },
           { type: 'input',
           name: 'last_name',
           message: 'What is the last name of the employee?',
        //    validate: (addLastName) => {
        //     if (addLastName) {
        //         return true; 
        //     } else {
        //         console.log('Please enter a valid role.');
        //         return false;
        //     }}
           },
           { type: 'list',
           name: 'role',
           message: `What is the employee's role?`,
           choices: roles, 
           },
           { type: 'list',
           name: 'manager',
           message: `Who is the employee's manager?`,
           choices: managers, 
           },
        ]) .then( answer => {

        })
    };

    updateEmployee = () => {
        console.log('...');
    };

    showEmployeeDepartment = () => {
        console.log('...');
    };

    endApplication = () => {
        console.log('===========================');
      
    };
    
    welcomeMessage();