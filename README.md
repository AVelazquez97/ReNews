# ReNews
A simple Tech news blog, made with React and a PHP REST API

- [Summary](#summary)
- [1. Preliminary Considerations](#1-preliminary-considerations)
  - [A. Installation and execution of MySQL Server](#a-installation-and-execution-of-mysql-server)
  - [B. Creation of the Database](#b-creation-of-the-database)
  - [C. Downloading the project from GitHub](#c-downloading-the-project-from-github)
- [2. Compilation and execution of the script](#2-compilation-and-execution-of-the-project)
  - [A. Compilation](#a-compilation)
  - [B. Execution](#b-execution)
- [3. Stack](#3-stack)


# Summary

This is a university project for RIA and PHP. Subjects that are part of the curriculum of the
[Technologist Degree in Computer Science, carrera ofrecida por UTEC](https://utec.edu.uy/en/education/undergraduate-study/technologist-degree-in-computer-science/).

The main objective of this activity is to create an SPA application...

- - -

# 1. Preliminary Considerations

## A. Installation and execution of MySQL server

## B. Creation of the Database

- Access to MySQL Server:

  `sudo mysql -h localhost -root -p`

- DB creation and user assignment:

  Once inside the MySQL server, the database must be created with the following command:
  `CREATE DATABASE reNews;`

  The user to be used for the connection must be created with the following command:

  `CREATE USER reNewsAdmin@localhost IDENTIFIED BY "reNews";`

  `GRANT ALL PRIVILEGES ON reNews.* TO reNewsAdmin@localhost WITH GRANT OPTION;`

- Creation of the tables:

## C. Downloading the project from GitHub

- To download the project it is necessary to have Git installed. Then, it is enough to enter the terminal and 
  enter the following command:

  ```
  git clone https://github.com/ignfer/ReNews.git
  ```

- - -
# 2. Compilation and execution of the project
## A. Compilation

## B. Execution

  - Frontend:

    `npm run dev`

  - Backend:

- - -

# 3. Stack

- Frontend:
   - [React](https://react.dev/) ⚛️
   - [Vite](https://vitejs.dev/) ⚡
   - [Bootstrap](https://getbootstrap.com/) 🖌️

- Backend:
   - [PHP 8.1](https://www.php.net/manual/en/) 🐘
   - [MySQL](https://dev.mysql.com/doc/) 🗄️
