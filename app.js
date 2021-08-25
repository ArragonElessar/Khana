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
    mainRoutes.index(req, res, process.env.GOOGLE_API_KEY)
})
app.get('/login', (req, res) => {
    // login route
    mainRoutes.login(req, res)
})
app.get('/register', (req, res) => {
    // register route
    mainRoutes.register(req, res)
})
app.get('/address/:type', (req, res) => {
    // get states list for address page
    const states_file = require('./public/js/states')
    // send address route with the states as a param
    mainRoutes.address(req, res, states_file.send_states(), req.params.type)
})
app.get('/menu', (req, res) => {
    // load the menu page
    mainRoutes.menu(req, res);
})
app.get('/checkout', (req, res) => {
    mainRoutes.checkout(req, res)
})

app.get('/payment', (req, res) => {
    mainRoutes.payment(req, res)
})

app.get('/history', (req,res)=>{
    mainRoutes.history(req, res)
})

// Handler routes
app.use(handlerRoutes);