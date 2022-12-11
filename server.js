//________ modules _________
//import mysql
const mysql = require('mysql2');
//import inquirer
//import inquirer from 'inquirer';
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
    password: '' 
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
    inquirer.promp([
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
        if (choices === 'View all employees by department'){
            showEmployeeDepartment();  
        }
        if (choices === 'Delete a role'){
          
            deleteRole(); 
        }
        if (choices === 'Delete an employee'){
            viewBudget();
        }
        if (choices === 'View department budgets'){
            deleteEmployee(); 
        }
        else {
            //call function to end the application 
        }
    
    });

};

showDepartments = () => {
    console.log('...Showing all Departments...');
        if (err) throw err;
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
    };

    showEmployees =() => {
        console.log('...');
    };

    addDepartment = () => {
        console.log('...');
    };

    addRole = () => {
        console.log('...');
    };

    addEmployee = () => {
        console.log('...');
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