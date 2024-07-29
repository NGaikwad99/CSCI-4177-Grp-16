const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getDatabase } = require('./db');
const { ObjectId } = require('mongodb'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/users', async (req, res) => {
    try {
        const db = getDatabase();
        const users = await db.collection('users').find().toArray();
        res.status(200).json({
            message: "Users retrieved",
            success: true,
            users: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

app.post('/meetings/schedule', async (req, res) => {
    try {
        const db = getDatabase();
        if (!db) {
            console.error('Database connection failed');
            return res.status(500).json({ message: 'Database connection failed' });
        }

        const { date, person, type, userType } = req.body;
        const formattedDate = new Date(date).toLocaleDateString();

        const isDuplicate = await db.collection('meetings').findOne({
            date: formattedDate,
            person: person,
            userType: userType
        });

        if (isDuplicate) {
            console.error('Duplicate meeting found');
            return res.status(400).json({ message: 'The same person cannot book an appointment on the same day twice.' });
        }

        const meeting = {
            date: formattedDate,
            person,
            type,
            userType
        };

        const result = await db.collection('meetings').insertOne(meeting);

        if (!result || !result.insertedId) {
            throw new Error('Meeting insertion failed');
        }

        res.status(201).json({
            _id: result.insertedId,
            ...meeting
        });
    } catch (err) {
        console.error('Error scheduling meeting:', err);
        res.status(500).json({ message: 'Error scheduling meeting', error: err.message });
    }
});

app.get('/meetings/user/:userType', async (req, res) => {
    try {
        const db = getDatabase();
        if (!db) {
            console.error('Database connection failed');
            return res.status(500).json({ message: 'Database connection failed' });
        }

        const meetings = await db.collection('meetings').find({ userType: req.params.userType }).toArray();
        res.status(200).json(meetings);
    } catch (err) {
        console.error('Error fetching upcoming meetings:', err);
        res.status(500).json({ message: 'Error fetching upcoming meetings', error: err.message });
    }
});

app.put('/meetings/reschedule/:id', async (req, res) => {
    try {
        const db = getDatabase();
        if (!db) {
            console.error('Database connection failed');
            return res.status(500).json({ message: 'Database connection failed' });
        }

        const { date, person, type, userType } = req.body;
        const formattedDate = new Date(date).toLocaleDateString();

        const isDuplicate = await db.collection('meetings').findOne({
            date: formattedDate,
            person: person,
            userType: userType,
            _id: { $ne: new ObjectId(req.params.id) }
        });

        if (isDuplicate) {
            console.error('Duplicate meeting found');
            return res.status(400).json({ message: 'The same person cannot book an appointment on the same day twice.' });
        }

        const meeting = {
            date: formattedDate,
            person,
            type,
            userType
        };

        const result = await db.collection('meetings').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: meeting }
        );

        if (!result || result.modifiedCount === 0) {
            throw new Error('Meeting rescheduling failed');
        }

        res.status(200).json(meeting);
    } catch (err) {
        console.error('Error rescheduling meeting:', err);
        res.status(500).json({ message: 'Error rescheduling meeting', error: err.message });
    }
});

app.delete('/meetings/cancel/:id', async (req, res) => {
    try {
        const db = getDatabase();
        if (!db) {
            console.error('Database connection failed');
            return res.status(500).json({ message: 'Database connection failed' });
        }

        const result = await db.collection('meetings').deleteOne({ _id: new ObjectId(req.params.id) });

        if (!result || result.deletedCount === 0) {
            throw new Error('Meeting cancellation failed');
        }

        res.status(200).json({ message: 'Meeting cancelled successfully' });
    } catch (err) {
        console.error('Error canceling meeting:', err);
        res.status(500).json({ message: 'Error canceling meeting', error: err.message });
    }
});

module.exports = app;