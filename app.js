// express
const express = require('express');

// morgan for logging
const morgan = require('morgan');

// session and cookie parser to store session data 
const session = require('express-session');
const cookieParser = require('cookie-parser');

// dotenv for env variables
require('dotenv').config();

// main routes controller file
const mainRoutes = require('./Controllers/main_routes')
// handler routes file
const handlerRoutes = require('./routes/handlerRoutes')


// setting up express app
const app = express();
// listen on port
app.listen(process.env.PORT);
// view engine ejs
app.set('view engine', 'ejs');
console.log("listening on port: " + process.env.PORT);
// declaring public folder
app.use(express.static('public'));
// config for post requests
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
    mainRoutes.index(req, res, req.session, process.env.GOOGLE_API_KEY)
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
app.get('/menu', (req, res) => {
    // load the menu page
    mainRoutes.menu(req, res, req.session);
})

// Handler routes
app.use(handlerRoutes);




// Google places api
/*app.post('/places', (req, res) => {
    const axios = require('axios')
    const URL = req.body.str;
    try {
        axios.get(URL).then(ret => {
            console.log(ret.data);
            res.send(ret.data)
        }).catch(err => {
            console.log(err)
        })
    } catch (err) {
        res.send(err)
    }

})
*/
