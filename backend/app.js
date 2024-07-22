const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Enable CORS for the frontend URL
const corsOptions = {
    origin: 'https://group16-app.netlify.app',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

let users = [
    {
        id: "5abf6783",
        email: "abc@abc.ca",
        firstName: "ABC"
    },
    {
        id: "5abf674563",
        email: "xyz@xyz.ca",
        firstName: "XYZ"
    }
];

// GET /users
app.get('/users', (req, res) => {
    res.status(200).json({
        message: "Users retrieved",
        success: true,
        users: users
    });
});

module.exports = app;
