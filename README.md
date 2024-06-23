![logo](https://github.com/ignfer/ReNews/blob/main/renews-logo.png)
# ReNews
A simple Tech news blog, with a React frontend and a CodeIgniter backend.

- [Summary](#summary)
- [1. Stack](#1-stack)
- [2. Preliminary Considerations](#2-preliminary-considerations)
  - [Frontend](#frontend)
    - [Instalation of Node.js and npm](#instalation-of-nodejs-and-npm)
  - [Backend](#backend)
    - [A. Installation of Apache Server](#a-installation-of-apache-server)
    - [B. Installation of PHP and Extensions](#b-installation-of-php-and-extensions)
    - [C. Installation of Composer](#c-installation-of-composer)
    - [D. Creation of the Database](#d-installation-and-excution-of-mysql-server)
    - [E. Database creation and user assignment](#e-database-creation-and-user-assignment)
- [3. Downloading the project from GitHub](#3-downloading-the-project-from-github)
- [4. Proyect execution on local server](#4-proyect-execution-on-local-server)
  - [Frontend](#frontend)
  - [Backend](#backend)


# Summary

This is a university project for RIA and PHP. Subjects that are part of the curriculum of the
[Technologist Degree in Computer Science, offered by UTEC](https://utec.edu.uy/en/education/undergraduate-study/technologist-degree-in-computer-science/).

<!-- The main objective of this activity is to create an SPA application... -->

- - -
# 1. Stack

- Frontend:

  - [Node.js](https://nodejs.org/en/) 🚀
  - [npm](https://www.npmjs.com/) 📦
  - [React](https://react.dev/) ⚛️
  - [Vite](https://vitejs.dev/) ⚡
  - [Bootstrap](https://getbootstrap.com/) 🖌️

- Backend:

  - [Apache/2.4.xx (Unix)](https://httpd.apache.org/) 🦊
  - [PHP  8.1.xx](https://www.php.net/manual/en/) 🐘
  - [CodeIgniter 4.5.xx](https://codeigniter.com/) 🎸
  - [MySQL 8.0.37-0ubuntu0.20.04.3](https://dev.mysql.com/doc/) 🐬
  - [Composer 2.7.xx](https://getcomposer.org/) 🎼

- Miscellaneous:

  - [Git](https://git-scm.com/) 🐙

- - -

# 2. Preliminary Considerations

## Frontend:

### Instalation of Node.js and npm:

1. To install Node.js and npm, you can use FNM (Fast Node Manager) with the following commands:

    ```bash
    curl -fsSL https://fnm.vercel.app/install | bash
    ```    

2. Then, is recommended to add the followings lines to the `~/.bashrc` file:
    ```bash
    # fnm
    FNM_PATH="/home/phpdev/.local/share/fnm"
    if [ -d "$FNM_PATH" ]; then
    export PATH="$FNM_PATH:$PATH"
    eval "`fnm env`"
    fi
    ```
    
    Consider to edit the `~/.bashrc` file with the following command:
    ```bash
    nano ~/.bashrc
    ```

3. And, apply the changes with the following command:
    ```bash
    source ~/.bashrc
    ```

4. One FNM is installed, you can install the desired version of Node.js with the following command:
    ```bash
    fnm use --install-if-missing 20
    ``` 
5. Check the installation with the following commands:
    ```bash
    node --version
    npm --version
    ```

## Backend:

### A. Installation of Apache Server

1. To install Apache Server, you can use the following commands:

    ```bash
    sudo apt update
    sudo apt install apache2
    ```

2. To check the installation, you can use the following command:

    ```bash
    systemctl status apache2
    ```
   
3. To set up Apache to start on boot, you can use the following command:

    ```bash
    sudo systemctl enable apache2
    ```

### B. Installation of PHP and Extensions

1. To install PHP, you can use the following commands:

    ```bash
    sudo add-apt-repository ppa:ondrej/php
    sudo apt update
    sudo apt install php8.1
    ```

2. To install the necessary extensions, you can use the following command:
    ```bash
    sudo apt install php8.1-intl php8.1-mbstring php8.1-curl php8.1-xml php8.1-mysql 
    ```

3. To check the installation, you can use the following command:

    ```bash
    php -v
    ```

### C. Installation of Composer
  
1. Update linux packages and download composer installer

    ```bash
    sudo apt update
    php -r "copy('https://getcomposer.org/installer','composer-setup.php');"
    ```
   
2. Install Composer and move it to the `/usr/bin` directory:

    ```bash
    sudo php composer-setup.php --install-dir=/usr/bin --filename=composer
    ```

3. Delete the installer:
  
    ```bash
    php -r "unlink('composer-setup.php');"
    ```

4. Check the installation:
  
    ```bash
    php composer -V
    ```
   
### D. Installation and excution of MySQL Server

1. To install MySQL, you can use the following commands:

    ```bash
    sudo apt update
    sudo apt install mysql-server
    sudo apt install mysql-client
    ```

2. MySQL service status check:

    ```bash
    sudo systemctl status mysql
    ```

    If its status is not active (running), you can start it with the following command:
    ```bash
    sudo systemctl start mysql`
    ```
3. Secure MySQL Server (optional):

    The following command helps to configure security parameters to the MySQL server:

    ```bash
    sudo mysql_secure_installation
    ```

    With this, it is possible to do the following:
    + Set a password for the root account.
    + Remove anonymous access.
    + Remove the test database.

4. Login to MySQL as root:

    ```bash
    sudo mysql -u root
    ```

### E. Database creation and user assignment:

1. Once inside the MySQL server, the database must be created with the following command:

    ```
    CREATE DATABASE reNews;
    ```
    The user to be used for the connection must be created with the following command:
    
    ```
    CREATE USER admin@localhost IDENTIFIED BY "admin";
    ```

    If you have problems with the password policy, you can change it with the following command:
    ```
    SET GLOBAL  validate_password.policy = "LOW";
    ```
2. Grant all privileges to the user with the following command:

    ```
    GRANT ALL PRIVILEGES ON reNews.* TO admin@localhost WITH GRANT OPTION;
    ```

3. Creation of the tables:

  - Users table:
    ```
    CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      nickname VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      is_admin BOOLEAN DEFAULT FALSE
    );
    ```

# 3. Downloading the project from GitHub

To download the project it is necessary to have Git installed. Then, it is enough to enter the terminal and 
  enter the followings commands:

  ```bash
  git clone https://github.com/ignfer/ReNews.git
  ```
    
  It doesn't matter where the project is downloaded, as long as it is in a directory that is easy to access.

- - -
# 4. Proyect execution on local server

Once the project is downloaded, it is necessary to execute the frontend and backend separately.
To do this, it is necessary to follow the following steps:


Move to the project directory:

```bash
cd ReNews
```
It is recommended to open two terminals, one for the frontend and one for the backend.
After that, you must follow the following steps for each part of the project:

### Backend:

1. `cd Backend`
2. `cp envExample .env`
3. `composer install`
4. `php spark serve`
<!-- 
4. `php spark migrate`
5. `php spark db:seed ..seeders`
-->

### Frontend:

1. `cd Frontend`
2. `npm install` or `npm i`
3. `npm run dev`


