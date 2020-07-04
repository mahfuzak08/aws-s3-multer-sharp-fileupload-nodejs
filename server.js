const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
require('dotenv').config();

const app = express();

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');

// Middleware Plugins
app.use(bodyParser.json())
app.use(express.static('public')) // Just for testing, use a static html

// Routes
app.use('/', [require('./routes/fileupload')]);

// Start the server
app.listen(7000, error => {
    if (error) console.error('Error starting', error);
    else console.log('Started at http://localhost:7000');
})