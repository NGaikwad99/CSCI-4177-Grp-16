const express = require('express');
const cors = require('cors');
const { getArticles, getVideos } = require('./OnlineResources');
const { databaseConnection} = require('./db');

const app = express();
const port = 3001;

app.use(cors());

app.get('/articles', async (req, res) => {
    try {
        const articles = await getArticles();
        res.status(200).json(articles);
    } catch (err) {
        res.status(500).send('Error retrieving articles');
    }
});

app.get('/videos', async (req, res) => {
    try {
        const videos = await getVideos();
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).send('Error retrieving videos');
    }
});

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



    
