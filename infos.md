## INSTRUCTIONS

1. DOWNLOAD NODE JS
    - https://nodejs.org/en
2. INSTALL NODE JS ON LINUX 
    - `tar -xvf file_name.tar.gz`
    - `cd folder_name`
    - Copy the files to the appropriate directories
    - `sudo cp -R * /usr/local/`
    - CHECK VERSION 
    - `node -v && npm -v`
3. CREATE FOLDER AND OPEN IN VSCODE 
    - `mkdir myProject` 
    - `code myProject`
4. CREATE `app.js`
    - `touch app.js`
5. CREATE `package.json`
    - `npm init` (creates a `package.json` file)
    - Replace script section with `"start": "node app.js"`
    - Now try `npm run start`
6. INSTALL EXPRESS  
    - `npm install express --save`
    - Use the `--save` flag to update `package.json` dependencies


## ADDITIONAL INFORMATION

To install `nodemon` and `pm2` for running your app in the background:

1. **Install `nodemon`**:
    - `npm install -g nodemon` or 
    - `npm install nodemon --save-dev`
    - To use `nodemon`, replace `node` with `nodemon` in your start script:
      - `"start": "nodemon app.js"`
    - Now try `npm run start`

2. **Install `pm2`**:
    - `npm install -g pm2`
    - To start your app with `pm2` and run it in the background:
      - `pm2 start app.js`
    - To save the current process list:
      - `pm2 save`
    - To restart all processes on server restart:
      - `pm2 startup`

With `pm2`, your Node.js application will be managed and run in the background, ensuring it stays up and running even after reboots or crashes.

## UNDERSTANDING EXPRESS ENDPOINTS

An Express endpoint can be defined as follows:

- `app`: The instance of your Express application.
- `METHOD`: The HTTP method (e.g., `get`, `post`, `put`, `delete`).
- `PATH`: The route path (e.g., `/`, `/api`, `/users`).
- `HANDLER(req, res)`: The function that handles the request (`req`) and the response (`res`).

### Example:

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```


## RESPONSE FORMAT

When sending responses using `res.send`, ensure to:
- Return JSON, not plain strings.
- Set the correct MIME type.

### Example:

```javascript
app.get('/api/data', (req, res) => {
  const data = {
    message: 'Hello, this is your data!',
    status: 'success'
  };
  res.json(data); // Sends JSON response with the correct MIME type
});
```

## MIDDLEWARES

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. These functions can perform various tasks such as:

- Executing code.
- Making changes to the request and response objects.
- Ending the request-response cycle.
- Calling the next middleware function in the stack.

## XAMPP

A software package that allows you to run an SQL database on your local machine.

## PHPMYADMIN

A web-based administration tool for managing MySQL and MariaDB databases, providing an intuitive interface through a web browser.

## ORM

Object-Relational Mapping (ORM) is a programming technique that converts data between incompatible type systems using object-oriented languages. It allows you to manipulate database data using objects and call methods on JavaScript objects instead of writing SQL queries.


## Sequelize

Sequelize is a promise-based Node.js ORM for PostgreSQL, MySQL, MariaDB, SQLite, and Microsoft SQL Server. It provides a straightforward API for interacting with databases using JavaScript objects and methods. With Sequelize, you can define models for your database tables, perform CRUD (Create, Read, Update, Delete) operations, and manage associations between tables. Sequelize also supports transactions, migrations, and schema synchronization, making it a powerful tool for database management in Node.js applications.

## Sequelize Driver

In the context of Sequelize, a driver refers to the specific database adapter that Sequelize uses to communicate with the database. Sequelize supports multiple database management systems (DBMS), including PostgreSQL, MySQL, MariaDB, SQLite, and Microsoft SQL Server. For each of these DBMS, Sequelize relies on a corresponding Node.js driver (or library) to handle the low-level communication with the database.

### Common Sequelize Drivers

- **PostgreSQL**: `pg` and `pg-hstore`
- **MySQL**: `mysql2`
- **MariaDB**: `mariadb`
- **SQLite**: `sqlite3`
- **Microsoft SQL Server**: `tedious`

### Installation

When setting up Sequelize, you need to install the appropriate driver for your database. For example, if you are using MySQL, you would install Sequelize and the `mysql2` driver as follows:

```bash
npm install sequelize mysql2
```
