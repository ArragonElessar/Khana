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
    db.createUser(client, req.body.name, req.body.email, req.body.password).then((ret) => {
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
        db.select(client, req.body.type, 'email', req.session.email).then(response => {
            if (response.length > 0) {
                res.send(response[0][req.body.type])
            } else {
                res.send(false)
            }

        })
    }
    // updates the address of given type and user
    if (req.body.message == 'update address') {
        db.updateAddress(client, req.body.type, req.body.email, req.body.address).then(response => {
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
    const menuFunctions = require('../public/js/menu_functions')
    if (req.params.by == 'category') {
        res.send(menuFunctions.sendItemsbyCategory(req.params.keyword));
    } else if (req.params.by == 'id') {
        res.send(menuFunctions.sendItemsbyId(req.params.keyword));
    }
})

// cart handler
router.post('/handler/cart/update', (req, res) => {
    // add to cart or update the cart 
    db.updateCart(client, req.session.email, req.body.id, req.body.qty).then(() => {
        res.send(true)
    })

})
// cart fetcher
router.post('/handler/cart/fetch', (req, res) => {
    // call getCart from db
    db.getCart(client, req.session.email).then(response => {
        // return array 
        let array = [];
        // subtotal object to fit in return array
        let subTotal = { subTotal: 0, tax: 0.05 }
        // get menu functions
        const menuFunctions = require('../public/js/menu_functions')
        // get items from cart {id, name, rate}
        for (let i = 0; i < response.length; i++) {
            let item = menuFunctions.sendItemsbyId(parseInt(response[i].id))
            // add to subtotal
            subTotal.subTotal += parseInt(response[i].qty) * item.rate;
            // set the qty parameter for item
            item["qty"] = parseInt(response[i].qty);
            // add to array
            array.push(item)
        }
        // push subtotal
        array.push(subTotal)
        // return array
        res.send(array)
    })
})

router.post('/handler/pay', (req, res) => {
    // get order fields from request 
    order = req.body
    order["email"] = req.session.email
    order["status"] = false;
    order["timeStamp"] = new Date().toLocaleString()
    // set session order field so that payments page can confirm
    req.session["order"] = order;
    res.send(true)
})

router.post('/handler/confirm', (req, res)=>{
    // set status field
    req.session.order.status = Boolean(req.body.status)
    // add the new order
    db.addOrder(client, req.session.order).then(response =>{
        console.log("order done!")
        delete req.session.order
    })
    console.log("req order" + req.session.order)
    res.send(true)
})

router.get('/handler/orders', (req, res)=>{
    db.getOrders(client, req.session.email).then(orders=>{
        res.send(orders)
    })
    
})

// export the entire router to app
module.exports = router;