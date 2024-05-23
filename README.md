# ReNews
A simple Tech news blog, made with React and a PHP REST API

- [Summary](#summary)
- [1. Stack](#3-stack)
- [2. Preliminary Considerations](#1-preliminary-considerations)
  - [A. Installation and execution of MySQL Server](#a-installation-and-execution-of-mysql-server)
  - [B. Creation of the Database](#b-creation-of-the-database)
  - [C. Downloading the project from GitHub](#c-downloading-the-project-from-github)
- [3. Compilation and execution of the script](#2-compilation-and-execution-of-the-project)
  - [A. Compilation](#a-compilation)
  - [B. Execution](#b-execution)


# Summary

This is a university project for RIA and PHP. Subjects that are part of the curriculum of the
[Technologist Degree in Computer Science, carrera ofrecida por UTEC](https://utec.edu.uy/en/education/undergraduate-study/technologist-degree-in-computer-science/).

The main objective of this activity is to create an SPA application...

- - -
# 1. Stack

- Frontend:

  - [React](https://react.dev/) ⚛️
  - [Vite](https://vitejs.dev/) ⚡
  - [Bootstrap](https://getbootstrap.com/) 🖌️

- Backend:

  - [XAMPP](https://www.apachefriends.org/index.html) 🚀
    - [PHP  8.1.xx](https://www.php.net/manual/en/) 🐘
    - [MariaDB 10.4.xx](https://mariadb.org/) 🐬
    - [Apache/2.4.xx (Unix)](https://httpd.apache.org/) 🦊
  - [CodeIgniter 4](https://codeigniter.com/) 🎸
  - [Composer](https://getcomposer.org/) 🎼


- - -

# 2. Preliminary Considerations

## A. Installation and execution of XAMPP

  1. Download the XAMPP installer from the official website: [XAMPP](https://www.apachefriends.org/index.html)
     Usually, is installed on `/opt/` folder. 
    
  2. After installed, run the server with the following command: 

    ```bash
    sudo /opt/lampp/lampp start
    ```
  
## B. Creation of the Database

- Access to MySQL Server with PHPMyAdmin or any other client. Also can be accessed from command line, with the following command:

   ```bash
   /opt/lampp/bin/mysql -h localhost -u root
   ```
   But first, you must access to the MySQL/MariaDB conf file (`/opt/lampp/etc/my.cnf`) and edit the password field, in the `[client]` section.
   ```
   You can do it that, with this command:
   ```bash
   nano /opt/lampp/etc/my.cnf
   ```


- DB creation and user assignment:

  Once inside the MySQL server, the database must be created with the following command:

  ```
  `CREATE DATABASE reNews;`
  ```
  The user to be used for the connection must be created with the following command:

  ```
    CREATE USER reNewsAdmin@localhost IDENTIFIED BY "reNews";
  ```

  ```
    GRANT ALL PRIVILEGES ON reNews.* TO reNewsAdmin@localhost WITH GRANT OPTION;
  ```

- Creation of the tables:

## C. Downloading the project from GitHub

- To download the project it is necessary to have Git installed. Then, it is enough to enter the terminal and 
  enter the following command:

  ```bash
  git clone https://github.com/ignfer/ReNews.git
  ```

- - -
# 3. Compilation and execution of the project
## A. Compilation

## B. Execution

### Frontend:

  1. `cd Frontend`

  2. `npm install`

  3. `npm run dev`

### Backend:

  1. `cd Backend`
