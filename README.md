# PFG-FRONTEND

![npm](https://img.shields.io/badge/npm-v8.5.4-green)

## Table of Contents

1. [Technologies](#technologies)
2. [Installation](#installation)
3. [Usage](#usage)

<a name="technologies"></a>

### Technologies

---

This project was bootstrapped with Create React App.

A list of technologies used within the project:

- [NPM](https://www.npmjs.com/): Version 8.5.4
- [React](https://es.reactjs.org/): Version 16.13.1
- [Bootstrap](https://getbootstrap.com/docs/5.0/): Version 5.1.3

<a name="instalation"></a>

### Instalation

---

Before starting the frontend application you should already have installed and have running the backend application, for further instructions please check the Readme.md file from [it's repository](https://github.com/gonzaloeiza/PFG-backend).

Then you should edit the /src/config.js and set the backend url to the corresponding url (default http://localhost:5000) where the backend application is running. Once done, we can start with the frontend installation.

The first step to begin with the frontend instalation is to install the necessary dependencies that are used:

```
npm i
```

After installing the necesary dependencies you can either run the application in development mode by running the next command:

```
npm start
```

Or you can build the app for production to the build folder by running this command:

```
npm run build
```

<a name="usage"></a>

### Usage

---

You cant test that the application runs correctly by accessing to: http://localhost:3000.
You should be able to test things by logging in as a user with the following credentials:

- email: eizaguirregonzalo@gmail.com
- password: 12345678

If you want to access the administration panel head to: http://localhost:3000/admin the default credentials for the administrator panel should be:

- email: admin@gmail.com
- password: 12345678

In case those credentials don't work, check the [BACKEND REPOSITORY](https://github.com/gonzaloeiza/PFG-backend) installation and see them there.
