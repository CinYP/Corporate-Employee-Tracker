//________ modules _________
//import mysql
const mysql = require('mysql2');
//import inquirer
import inquirer from 'inquirer';
//import internal connection 
//const connection = require('./db/connection');
//import console.table
const cTable = require('console.table'); 


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001, 
    user: 'root',
    database: 'employee_db',
    password: '' 
});

//Connection ID
connection.connect((err)=>{
    if (err) {
        console.log(err)
        console.log('Something went wrong.')
    } connection();
});


connection = () => {
    console.log('=================================')
    console.log('|| EMPLOYEE MANAGER STARTED    ||')
    console.log('=================================')
    //nextfunction here
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
    //     if (choices === 'View all roles'){
    //         //call function; 
    //     }
    //     if (choices === 'View all employees'){
    //         //call function; 
    //     }
    //     if (choices === 'Add a department'){
    //         //call function; 
    //     }
    //     if (choices === 'Add a role'){
    //         //call function; 
    //     }
    //     if (choices === 'Add an Employee'){
    //         //call function; 
    //     }
    //     if (choices === 'Update an employee role'){
    //         //call function; 
    //     }
    //     if (choices === 'Update an employee manager'){
    //         //call function; 
    //     }
    //     if (choices === 'Delete a department'){
    //         //call function; 
    //     }
    //     if (choices === 'Delete a role'){
    //         //call function; 
    //     }
    //     if (choices === 'Delete an employee'){
    //         //call function; 
    //     }
    //     if (choices === 'View department budgets'){
    //         //call function; 
    //     }
    //     else {
    //         //call function to end the application 
    //     }
    
    });

};

showDepartments = () => {
    console.log('...Showing all Departments...');
        if (err) throw err;
        //Select department names and department id from departments table 
        connection.query('SELECT * FROM department' , function (err,rows) {
          if (err) throw err;
          console.table(rows);
        //restarting prompt from user
        startApp(); 
        });
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