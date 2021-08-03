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

// states json testing state

// main routes coontroller
const mainRoutes = require('./Controllers/main_routes')

// setting up express app and view engine, middleware

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


// Main routes, sending session to every page as a parameter
app.get('/', (req, res) => {
    // index route
    mainRoutes.index(req, res, req.session)
})
app.get('/login', (req, res) => {
    // login route
    mainRoutes.login(req, res, req.session)
})
app.get('/register', (req, res) => {
    // register route
    mainRoutes.register(req, res, req.session)
})
app.get('/address', (req, res) => {
    // get states list for address page
    const states_file = require('./public/js/states')
    // send address route with the states as a param
    mainRoutes.address(req, res, req.session, states_file.send_states())
})


// request handlers

//login handler
app.post('/handler/login', (req, res) => {
    // getting password from server of given user
    db.select(client, 'password', 'email', req.body.email).then(response => {
        // match form password against server password
        if (response[0].password == req.body.password) {
            // logged in, enter in log
            db.log(client, req.body.email, 'login');
            // set session variables
            req.session.login_state = true;
            req.session.email = req.body.email;
            res.send(true);
        } else {
            // credentials dont match, make css changes hence sent false to frontend
            res.send(false);
        }
    })
})
// register handler
app.post('/handler/register', (req, res) => {
    // create new user
    db.create_user(client, req.body.name, req.body.email, req.body.password).then((ret) => {
        // ret is a boolean value
        if (ret) {
            // successfully created, send to log
            db.log(client, req.body.email, 'registered');
            // set session variables, logging user in
            req.session.login_state = true;
            req.session.email = req.body.email;
            res.send(ret)
        } else {
            // if user already exists/ any other issues sending a false over.
            res.send(false);
        }
    })
})
// logout
app.post('/handler/logout', (req, res) => {
    // destroys session, clearing all variables
    req.session.destroy();
    // call logout function
    db.logout(client, req).then(ret => {
        if (ret) {
            res.send(ret);
        }
    })

})
// address handler
app.post('/handler/address', (req, res) => {
    // sends address of given type and user
    if (req.body.message == 'send address') {
        db.select(client, req.body.type, 'email', req.body.email).then(response => {
            res.send(response[0][req.body.type])
        })
    }
    // updates the address of given type and user
    if (req.body.message == 'update address') {
        db.update_address(client, req.body.type, req.body.email, req.body.address).then(response => {
            res.send(response)
        })
    }
})
app.get('/handler/address/:state', (req, res) => {
    // send cities of a givven state
    const states_file = require('./public/js/states')
    const state = req.params.state;
    res.send(states_file.send_cities(state))
})

