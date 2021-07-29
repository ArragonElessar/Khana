const express = require('express');
const path = require('path');
const index = require('./Controllers/main_routes');
const mr = require('./Controllers/main_routes')

// setting up express app and view engine
const app = express();
app.listen(3000);
app.set('view engine', 'ejs');
console.log("listening on port 3000");
app.use(express.static('public'));


// Main routes
app.get('/', mr.index)
app.get('/login', mr.login)
app.get('/register', mr.register)
app.get('/register/add_address', mr.address)