const express = require('express'); //instance of an express application is created
const cors = require('cors');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const collectionName = 'users';
const User = require('./models/User');

const MONGO_URI = 'mongodb+srv://admin:hm8KzxFO1RX4qArn@ssdata.tcuzl0t.mongodb.net/safespace?retryWrites=true&w=majority&appName=ssdata';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

function startServer(server, db){
    const app = express();
    app.use(cors());
    app.use(express.json());

    const crypto = require('crypto');

    const secret = crypto.randomBytes(64).toString('hex');
    console.log(secret);
    
    app.post('/login', async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await db.collection(collectionName).findOne({ username });
            if (!user) return res.status(400).send('Invalid credentials');

            console.log(user);

            // Assuming user.password is plain text for simplicity; ideally, you should hash passwords
            if (user.password !== password) return res.status(400).send('Invalid credentials');

            const token = jwt.sign({ id: user._id }, secret, { expiresIn: '5h' });
            res.json({ token });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    });

    app.post('/register', async (req, res) => {
        const { name, email, username, password, role } = req.body;
        // const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name: name, email: email, username: username, password: password, role: role });
        try {
            await newUser.save();
            console.log('User saved successfully');
            res.status(201).send('User registered');
        } catch (error) {
            console.error('Error saving user:', error);
            res.status(500).send('Error registering user', error);
        }

        res.status(201).send('User registered');
    });

    server.on('request', app);
}

module.exports = {startServer};