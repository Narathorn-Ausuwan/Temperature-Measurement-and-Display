
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const { createClient } = require('@supabase/supabase-js');
const webpush = require('web-push');

dotenv.config();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');

supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const indexController = require('./controllers/indexController');

app.get('/', indexController);

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
    }
})

app.listen(4000, () => {
    console.log("App listenning on port 4000");
})
