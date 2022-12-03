//external modules 
const mysql = require('mysql2');
//const inquirer = require('inquirer');
const connection = require('./db/connection');


// simple query
connection.query(
    'SELECT * FROM department',
    function(err, results) {
      console.log(results); // results contains rows returned by server
    }
  );
  

// inquirer
//   .prompt([
//     {
//         input:
//     },

//   ])
//   .then((answers) => {
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       console.log(err);
//     } else {
//       console.log(`
//         ===========================================

//         Successfully managed employees to database!!

//         ============================================
//       `);
//     }
//   });



  //'Cin'@'localhost' IDENTIFIED BY 'admin';