const express = require('express');
const morgan = require('morgan');
const db = require('./db')
require('dotenv').config();

// db configuration
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();


// main routes coontroller
const mainRoutes = require('./Controllers/main_routes')

// setting up express app and view engine
const app = express();
app.listen(process.env.PORT);
app.set('view engine', 'ejs');
console.log("listening on port: " + process.env.PORT);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// morgan
app.use(morgan('dev'))

// Main routes
app.get('/', mainRoutes.index)
app.get('/login', mainRoutes.login)
app.get('/register', mainRoutes.register)
app.get('/register/add_address', mainRoutes.address)


// request handlers
app.post('/handler/login', (req, res) => {
    db.select(client, 'password', 'email', req.body.email).then(response => {
        if (response[0].password == req.body.password) {
            db.log(client, req.body.email, 'login');
            res.send(true);
        } else {
            res.send(false);
        }
    })
})
app.post('/handler/register', (req, res) => {
    db.create_user(client, req.body.name, req.body.email, req.body.password).then((ret) => {
        db.log(client, req.body.email, 'registered');
        res.send(ret)
    })
})