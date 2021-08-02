const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');


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

// trial session configuration
/*let session = {
    login_state: false,
    email: '',
}*/


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

// setting up sessions
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    saveUninitialized: true,
    resave: true,
}))


// Main routes
app.get('/', (req, res) => { mainRoutes.index(req, res, req.session) })
app.get('/login', (req, res) => { mainRoutes.login(req, res, req.session) })
app.get('/register', (req, res) => { mainRoutes.register(req, res, req.session) })
app.get('/register/add_address', (req, res) => { mainRoutes.register(req, req.res, session) })


// request handlers

//login
app.post('/handler/login', (req, res) => {
    db.select(client, 'password', 'email', req.body.email).then(response => {
        if (response[0].password == req.body.password) {
            db.log(client, req.body.email, 'login');
            req.session.login_state = true;
            req.session.email = req.body.email;
            console.log(session)
            res.send(true);
        } else {
            res.send(false);
        }
    })
})
// register
app.post('/handler/register', (req, res) => {
    db.create_user(client, req.body.name, req.body.email, req.body.password).then((ret) => {
        if (ret) {
            db.log(client, req.body.email, 'registered');
            req.session.login_state = true;
            req.session.email = req.body.email;

            res.send(ret)
        } else {
            console.log('user exists');
            res.send(false);
        }
    })
})
// logout
app.post('/handler/logout', (req, res) => {
    req.session.destroy();
    db.logout(client, req).then(ret => {
        if (ret) {
            console.log('logged out')
            res.send(ret);
        }
    })

})
