const { MongoClient } = require('mongodb');
const atlas_connection_string = 'mongodb+srv://admin3:admin12345@ssdata.tcuzl0t.mongodb.net/safespace?retryWrites=true&w=majority';

let mongoClient;

async function databaseConnection() {
    try {
        mongoClient = await MongoClient.connect(atlas_connection_string, { useNewUrlParser: true, useUnifiedTopology: true });
        return mongoClient.db('safespace');
    } catch (err) {
        console.error('Error connecting to MongoDB instance', err.message);
    }
}

function getDatabase() {
    if (!mongoClient) {
        console.log('Database is not connected');
    }
    return mongoClient.db('safespace');
}

module.exports = { databaseConnection, getDatabase };