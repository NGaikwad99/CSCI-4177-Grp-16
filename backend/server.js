const express = require('express');
const cors = require('cors');
const { databaseConnection } = require('./db');
const app = require('./app'); 

const port = 3001;

app.use(cors()); 

databaseConnection()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Error starting server: ', err);
        process.exit(1);
    });