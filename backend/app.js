const express = require('express'); //instance of an express application is created
const { ObjectId } = require('mongodb');
const collectionName = 'users';

function startServer(server, db){
    const app = express();
    app.use(express.json());

    //GET API to fetch all users
    app.get('/users', async(req, res) =>{
        try{
            const users = await db.collection(collectionName).find().toArray();
            res.status(201).json(users);
        } catch(err){
            res.status(500).json({success: false, message: err.message});
        }
    });

    //POST API to add users
    app.post('/add', async(req, res) => {
        try{
            const newUser = await db.collection(collectionName).insertOne(req.body);
            res.status(201).json({success: true, message: "User added successfully", id: newUser.insertedId});
        }catch(err){
            res.status(400).json({success: false, message: err.message});
        }
    });

    //PUT API to update the user
    app.put('/update/:id', async(req, res) => {
        try{
            await db.collection(collectionName).updateOne({_id: new ObjectId(req.params.id)}, { $set: req.body });
            res.status(200).json({success: true, message: 'User is updated'});
        }catch(err){
            res.status(500).json({success: false, message: err.message});
        }
    });

    server.on('request', app);
}

module.exports = {startServer};