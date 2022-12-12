//________ modules _________
//import mysql
const mysql = require('mysql2');

//import inquirer
const inquirer = require('inquirer'); 

//import internal connection 
//const connection = require('./db/connection');

//import console.table
const cTable = require('console.table'); 


const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306, 
    user: 'root',
    database: 'employee_db',
    password: 'Lily_ivy' 
});

//Connection ID
connection.connect((err)=>{
    if (err) {
        console.log(err)
        console.log('Something went wrong.')
    } welcomeMessage();
});


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
                'Update an employee manager', 
                'Delete a department',
                'Delete a role', 
                'Delete an employee',
                'View department budgets',
                'Nothing. Maybe later.'

            ]
        }])
     .then((answers)=>{
        const {choices} = answers; 

        if (choices === 'View all departments'){
            showDepartments();
        }
        if (choices === 'View all roles'){
            showRoles();
        }
        if (choices === 'View all employees'){
            showEmployees(); 
        }
         if (choices === 'View all employees by department'){
            showEmployeeDepartment();  
        }
        if (choices === 'View department budgets'){
            deleteEmployee(); 
        }
        if (choices === 'Add a department'){
            addDepartment(); 
        }
        if (choices === 'Add a role'){
            addRole();
        }
        if (choices === 'Add an Employee'){
            addEmployee(); 
        }
        if (choices === 'Update an employee role'){
            updateEmployee(); 
        }
        if (choices === 'Update an employee manager'){
            updateManager(); 
        }
        if (choices === 'Delete a department'){ 
            deleteDepartment(); 
        }
        if (choices === 'Delete a role'){
          
            deleteRole(); 
        }
        if (choices === 'Delete an employee'){
            viewBudget();
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
        connection.query(`SELECT employee.first_name, employee.last_name AS employee FROM employee`, 
        function (err,rows) {
          if (err) throw err;
          console.table(rows);
        //restarting prompt from user
        startApp(); 
        });
    };

    //come back to this
    showEmployeeDepartment = () => {
        console.log('...Showing all Employees...');
        connection.query(`SELECT employee.first_name, employee.last_name AS employee FROM employee`, 
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
                validate: (addDepartment) => {
                    if (addDepartment) {
                        return true; 
                    } else {
                        console.log('Please enter a valid department name');
                        return false;
                    }
                }
            }
        ]).then(answer =>{
            connection.query(`INSERT INTO department (name) VALUES ('${answer.addDepartment}')`),
            function (err,rows) {
                if (err) throw err;  
            }  
            console.table(rows);
            console.log(`Added ${answer.addDepartment} to Deparment database.`);
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
                validate: (addRole) => {
                    if (addRole) {
                        return true; 
                    } else {
                        console.log('Please enter a valid role.');
                        return false;
                    }
                }
            },
            {
                type: 'input', 
                name: 'salary', 
                default: 50000, 
                message: 'What is the salary for this role?', 
                validate: (salary) => {
                    if (salary) {
                        return true; 
                    } else {
                        console.log('Please enter a valid salary.');
                        return false;
                    }
                }
            },
            {
                type: 'input', 
                name: 'departmentID', 
                default: 1, 
                message: 'What is the department ID for this role?', 
                validate: (departmentID) => {
                    if (departmentID) {
                        return true; 
                    } else {
                        console.log('Please enter a valid role.');
                        return false;
                    }
                }
            }
        ]).then(answer =>{
            const roleParameters = [answer.role, answer.salary, answer.departmentID]
            
            connection.query(`INSERT INTO role (title, salary, department_id) VALUES (${answer.addRole},${answer.salary},${answer.departmentID}) `),
            function (err,rows) {
                if (err) throw err;
                 console.table(rows)
                 console.log(`Added ${answer.addRole} to role database.`)
                 showRoles()
            }  
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
           name: 'first_last',
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
           name: 'first_last',
           message: `What is the employee's role?`,
           choices: roles, 
           },
           { type: 'list',
           name: 'first_last',
           message: `Who is the employee's manager?`,
           choices: managers, 
           },
        ]) .then( answer => {

        })
    };

    updateEmployee = () => {
        console.log('...');
    };

    updateManager = () => {
        console.log('...');
    };

    showEmployeeDepartment = () => {
        console.log('...');
    };

    deleteDepartment = () => {
        console.log('...');
    };

    deleteRole = () => {
        console.log('...');
    };

    deleteEmployee = () => {
        console.log('...');
    };

    viewBudget = () => {
        console.log('...');
    };

    endApplication = () => {
        console.log('===========================');
        // console.log('........Thank You .........')
        // console.log('===========================')
        // console.log(' Powered by Cinthia Pruitt')
    };
    

// // simple query
// connection.query(
//     'SELECT * FROM `department`',
//     function(err, results) {
//       console.log(results); // results contains rows returned by server
//       //console.log(fields); // fields contains extra meta data about results, if available
//     }
//   );
  

//       console.log(`
//         ===========================================

//         Successfully managed employees to database!!

//         ============================================

  //'Cin'@'localhost' IDENTIFIED BY 'admin';