# ReNews
A simple Tech news blog, made with React and a PHP REST API

- [Summary](#summary)
- [1. Stack](#1-stack)
- [2. Preliminary Considerations](#2-preliminary-considerations)
  - [A. Installation and execution of MySQL Server](#a-installation-and-execution-of-xampp)
  - [B. Installation of Composer](#b-installation-of-composer)
  - [C. Creation of the Database](#c-creation-of-the-database)
  - [D. Downloading the project from GitHub](#d-downloading-the-project-from-github)
- [3. Compilation and execution of the script](#3-compilation-and-execution-of-the-project)
  - [A. Compilation](#a-compilation)
  - [B. Execution](#b-execution)


# Summary

This is a university project for RIA and PHP. Subjects that are part of the curriculum of the
[Technologist Degree in Computer Science, offered by UTEC](https://utec.edu.uy/en/education/undergraduate-study/technologist-degree-in-computer-science/).

The main objective of this activity is to create an SPA application...

- - -
# 1. Stack

- Frontend:

  - [Node.js](https://nodejs.org/en/) 🚀
  - [npm](https://www.npmjs.com/) 📦
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

- Miscellaneous:

  - [Git](https://git-scm.com/) 🐙

- - -

# 2. Preliminary Considerations

## A. Installation and execution of XAMPP

- Download the XAMPP installer from the official website: [XAMPP](https://www.apachefriends.org/index.html).
 
  Usually, is installed inside `/opt/` folder. 


- After installed, run the server with the following command:
    
  ```bash
  sudo /opt/lampp/lampp start
  ```
## B. Installation of Composer

  On backend folder, composer is already installed. But, if you want to install it globally, you must run the 
   following commands:

  - Download the installer:

    ```bash
    /opt/lampp/bin/php -r "copy('https://getcomposer.org/installer','composer-setup.php');"
    ```

  - Install Composer and move it to the `/usr/local/bin` folder:
    ```bash
    /opt/lampp/bin/php  composer-setup.php --install-dir=/usr/local/bin --filename=composer
    ```

  - Delete the installer:
    ```bash
    /opt/lampp/bin/php -r "unlink('composer-setup.php');"
    ```

  - Check the installation:
    ```bash
    /opt/lampp/bin/php /usr/local/bin/composer --V
    ```

## C. Creation of the Database

- You can access to MySQL Server with PHPMyAdmin or any other client. Also, can be accessed from command line, 
  with the following command:

   ```bash
   /opt/lampp/bin/mysql -h localhost -u root
   ```
   But first, you must access to the MySQL/MariaDB conf file (`/opt/lampp/etc/my.cnf`) and edit the password field, in the `[client]` section.
   
   You can do that with this command:
   ```bash
   nano /opt/lampp/etc/my.cnf
   ```


- DB creation and user assignment:

  Once inside the MySQL server, the database must be created with the following command:

  ```
  CREATE DATABASE reNews;
  ```
  The user to be used for the connection must be created with the following command:

  ```
  CREATE USER reNewsAdmin@localhost IDENTIFIED BY "renews";
  ```
  
  And grant all privileges to the user with the following command:
  ```
  GRANT ALL PRIVILEGES ON reNews.* TO reNewsAdmin@localhost WITH GRANT OPTION;
  ```

- Creation of the tables:

## D. Downloading the project from GitHub

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
