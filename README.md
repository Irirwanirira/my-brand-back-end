[![pages-build-deployment](https://github.com/Irirwanirira/my-brand-back-end/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/Irirwanirira/my-brand-back-end/actions/workflows/pages/pages-build-deployment) 


[![Coverage Status](https://coveralls.io/repos/github/Irirwanirira/my-brand-back-end/badge.svg?branch=dev)](https://coveralls.io/github/Irirwanirira/my-brand-back-end?branch=dev)

# my-brand-back-end
Link to deployment: https://my-brand-rvzj.onrender.com
link to redocli documetatio: https://irirwanirira.github.io/my-brand-back-end/

# Node.js Backend with Github Action and Coveralls

This repository contains a Node.js backend project built with Express.js, Tests, Github actions and a connected Mongo database. The server operates on port 3000.

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
4. [Project Structure](#project-structure)
5. [Contributing](#contributing)
6. [License](#license)

## 1. Introduction

My brand combines my portfolio with interactive articles, enabling users to engage with published content and send messages at their convenience.


## 2. Prerequisites
Install:
- Node.js and npm (https://nodejs.org/)

## 3. Getting Started


3.1 Clone the repository to your local machine:

```bash
   git clone https://github.com/Irirwanirira/my-brand-back-end.git
   cd my-brand-back-end
```

a Create a .env file and add your credentials

```
    PORT = 3000

    NODE_ENV = 'development'

    # Online db
    MONGODB_URL= " "
   
    PORT = 3000
    ACCESS_TOKEN_SECRET=" "
    REFRESH_TOKEN_SECRET=" "
    GOOGLE_CLIENT_ID=" "
    GOOGLE_CLIENT_SECRET=" "
    COVERALLS_REPO_TOKEN=" "

    BASE_URL='http://localhost:3000/brand/api/v1'
```

3.2 Running the Application

Install Node.js dependencies:

```bash
npm install
```
Run swagger
```bash
 npm run swagger
```

start compiler
```bash
    npm run build
```

start the app
```bash
    npm run start-dev
```

Access the backend at http://localhost:3000/brand/api/v1

A

## 4. Project Structure 
The project directory structure is organized as follows:

```bash
MY-BRAND/
  ├── .github/
  ├── build/
  ├── src/
  │   ├── controllers/
  │   ├── middlewares/
  │   ├── models/
  │   └── routes/ 
  │   ├── swaggerDoc/
  │   └── tests/ 
  │   ├── utils/
  │
  ├── app.ts
  ├── database.ts
  └── index.ts
```
Here is a breakdown of the key directories and files:

```bash
.github/: GitHub actions file.
build/: Build Ts into Js.
tests/: Test scripts and test-related files.
src/: Source code for the application.
app.ts/: configure app and server.
database.ts/: Connection of database with the server.
index.js: Entry point for the Node.js application.
```
## 5. Contibuting
    It provides guidelines for users who want to contribute to the project. Explains the process for making contributions, such as forking the repository, creating branches, making changes, and submitting pull requests.

```bash
To contribute to this project, follow these steps:

Create a new branch for your changes:


git checkout -b feature/your-feature-name
Make changes and commit with clear messages:


git commit -m "Add feature: your-feature-name"
Push changes to the repository:


git push origin feature/your-feature-name
Submit a pull request against the main branch.

```
OR

```bash
Fork the repo on GitHub.
Create a new branch for your changes.
Make changes and commit with clear messages.
Push changes to your fork.
Submit a pull request to the main branch.
```
## 6. License



