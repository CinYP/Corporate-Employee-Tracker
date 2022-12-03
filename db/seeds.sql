INSERT INTO department (name)
VALUES ("Human Resources"),
       ("Marketing"),
       ("Engineering"),
       ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Recruiter",100000, 1),
       ("Data Science Engineer",250000, 3),
       ("Accountant",105000, 4),
       ("Account Manager", 95000,2),
       ("Marketing Manager", 125000,2),
       ("Human Resources Manager",150000, 1 ),
       ("Web Developer",250000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Cinthia","Pruitt", 2, NULL),
       ("David","Park",7, 1),
        ("Zack","Williams",1, NULL),
        ("Joseph","Park",6, 2),
        ("Sally","Williams",3, NULL),
        ("Alycia","Hobbs",4, NULL),
        ("Marry","Jane",5, 3);
         
       

    