// Imports
const express = require('express');
const mysql = require('mysql');

// Set hosting information
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

// Pull route functions
const index = require('./routes/index');
const player = require('./routes/player');

// Configuration object
const dbConfig = {
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'bd1999ebbd1d24',
    password: '2719f6a6',
    database: 'heroku_ec7af78531aff9f'
}

// Create the database using the config
const db = mysql.createConnection(dbConfig);

// Function to run on connect
function connectCallback (error) {
    if (error) {
        throw error;
    }

    console.log('Connected to the database');
}

// Open the connection to the database
db.connect(connectCallback);

// Set global db variable
global.db = db;

// Initialize app
let app = express();

// Setup middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // parse form data client

// Set routes
app.get('/', index.getHomePage);
app.get('/add', player.addPlayerPage);
app.get('/edit/:id', player.editPlayerPage);
app.get('/delete/:id', player.deletePlayer);
app.post('/add', player.addPlayer);
app.post('/edit/:id', player.editPlayer);

function listenCallback() {
    console.log(`Listening on http://${hostname}:${port}`);
}

app.listen(port, hostname, listenCallback);
