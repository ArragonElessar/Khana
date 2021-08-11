/**
 * This is the handler routes Router
 * All AJAX requests are processed here
 * All database interactions are processed here
 * */
// require express and create a router
const express = require('express');
const router = express.Router();


// import database interaction functions 
const db = require('../db')
// dotenv for env variables
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

// request handlers

//login handler
router.post('/handler/login', (req, res) => {
    // getting password from server of given user
    db.select(client, 'password', 'email', req.body.email).then(response => {
        // match form password against server password
        try {
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
        } catch (err) {
            console.log(err)
            res.send(false)
        }

    })
})
// register handler
router.post('/handler/register', (req, res) => {
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
router.post('/handler/logout', (req, res) => {
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
router.post('/handler/address', (req, res) => {
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
// city handler
router.get('/handler/address/:state', (req, res) => {
    // send cities of a given state
    const states_file = require('../public/js/states')
    const state = req.params.state;
    res.send(states_file.send_cities(state))
})

// menu builder
router.get('/handler/menu/:by&:keyword', (req, res) => {
    // requires menu functions 
    const menu = require('../public/js/menu_functions')
    if (req.params.by == 'category') {
        res.send(menu.sendItemsbyCategory(req.params.keyword));
    } else if (req.params.by == 'id') {
        res.send(menu.sendItemsbyId(req.params.keyword));
    }
})

// cart handler
router.post('/handler/cart/', (req, res) => {
    // add to cart or update the cart 
    db.updateCart(client, req.session.email, req.body.id, req.body.qty)
    res.send(true)
})

// export the entire router to app
module.exports = router;