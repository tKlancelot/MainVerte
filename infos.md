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
    - Now try `npm run start`  , `npm run dev` (if projet in production)
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

### VALIDATORS AND CONSTRAINTS

**Validators** are responsible for performing model validation at the JavaScript level. We can create our own validators or use those provided by Sequelize. If the validation fails, no request will be made.

**Constraints** are the rules defined at the database level.

## SECURITY

To make our REST API usable, we need to implement a new endpoint to allow the consumer to authenticate.

The two pillars of authentication:
1. Encrypt passwords -> this is done using the bcrypt module
2. Secure data exchange -> using JWT (JSON Web Tokens)

4 steps of authentication:
1. The client (WEB APP) makes a request to authenticate with our REST API (BACKEND). It must send a username/password to the /login endpoint.
2. Verify if the username/password are correct (using the bcrypt module). If they are, return a valid JWT to the client. Otherwise, send an error message.
3. Using the retrieved JWT, the client can now make secure requests to the endpoints of our REST API. It must include this token with each request that requires authentication. The token is sent in the HTTP request header. If the token is no longer valid, the client must request a new one.
4. If the JWT is valid, return the requested data to the client. Otherwise, deny access.

## OTHER JWT INFO

L'identifiant unique de l'utilisateur va permettre de générer un jeton jwt qui sera valide uniquement pour ce client. Il est personnel pour chaque utilsateur.
Le jeton contient aussi une clé secrète lors du cryptage du jeton.
Le jeton contient une date de validité. 


## HEROKU && HEROKU CLI 

We chose Heroku as our free hosting provider to deploy our server, REST API, and database. Heroku CLI is used for managing our Heroku applications from the command line, simplifying the deployment process.

To get started, create an account on the Heroku platform, install the Heroku CLI on your Linux system, and log in using the CLI to deploy and manage your applications.

`heroku login`

## GLOBAL NODEJS OBJECTS

In Node.js, global objects are accessible in all modules without requiring them.

### PROCESS

The process object is a key global object that provides information about and control over the current Node.js process, such as process.env, which is used to access environment variables.

### REQUIRE

This function is used to include modules in your application, allowing you to import libraries or files.

### __dirname: 

This global variable provides the absolute path to the directory that contains the currently executing script.

###  MODULE

This object represents the current module and contains information about it, including its exports.

### GLOBAL

This object is the global namespace in Node.js, allowing you to define global variables accessible across all modules.

## SPÉCIFITÉS DE MISE EN PRODUCTION

On utilisera donc les variables d'environnement fournie par node. 
1- Attention, on doit s'assurer de ne pas utiliser nodemon en production.
2- Express est un outil qui nous permet de passer en mode production afin de rendre l'api rest plus efficace
3- Heroku n'installe pas les dépendances de développement
