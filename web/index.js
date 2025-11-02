
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const ejs = require('ejs');
const webpush = require('web-push');

dotenv.config();

app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');

const indexController = require('./controllers/indexController');

app.get('/', indexController);
app.get('/home', indexController);
app.get('/pet-board', indexController);
app.get('/weather-forecast', indexController);
app.get('/log', indexController);
// app.get('/setting', indexController);

app.listen(4000, () => {
    console.log("App listenning on port 4000");
})
