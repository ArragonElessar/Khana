/* 
this file contains all the database functions for postgres
client object is passed from handlerRoutes.js as a parameter for every function call
all the functions here are exported to handlerRoutes.js
*/

// log function
async function log(client, email, message) {
    // logs given email, message to table: user_log 
    await client.query(`INSERT INTO public.user_log(email, log) 
    VALUES ('${email}', '${message}')`)
    return true
}

// select function having one field, and one where clause
async function select(client, out_field, in_field, in_value) {
    // return the response field(out field) where input field(in_field) == input value)in_value
    let ret = await client.query(`SELECT ${out_field} FROM users 
    WHERE ${in_field} = '${in_value}'`)
    return ret.rows
}

// create user function
async function createUser(client, name, email, password) {
    // first search if user with given email already exists
    let ret = await select(client, 'id', 'email', email)
    // ret here contains the rows of id that have the same email
    if (ret.length > 0) {
        // a row with given email exists so return with false
        console.log('user already exists')
        return false;
    } else {
        // user doesn't exist already 
        console.log('user does not exist already')
        // insert into tables user: name, email, password
        // HASHING STILL TO BE DONE for the passwords
        client.query(`INSERT INTO public.users(name, email, password) 
        VALUES ('${name}', '${email}', '${password}');`).then(ret => {
            console.log('user added');
        })
        return true;
    }
}
// logout function is just an extension for the log function
// remove redundant code later
async function logout(client, req) {
    log(client, req.body.email, 'logout').then(ret => {
        return ret
    })
}

// update address
async function updateAddress(client, type, email, address) {
    // update home/work/other (type) col of users table with address given by user 
    client.query(`UPDATE public.users
	SET ${type} = '${address}'
	WHERE email='${email}';`).then(ret => {
        return true
    })
}

// cart adder
async function updateCart(client, email, id, qty) {
    // check if item having given id is already there in the users cart
    client.query(`SELECT qty FROM public.cart 
    WHERE email='${email}' AND id='${id}'`).then(ret => {
        if (ret.rows.length > 0) {
            // item exists, hence update to the new quantity
            client.query(`UPDATE public.cart
            SET qty='${qty}'
            WHERE email='${email}' AND id='${id}';`).then(ret => {
                return true;
            })
        } else {
            // item doesn't exist, insert into cart table
            client.query(`INSERT INTO public.cart(
                email, id, qty)
                VALUES ('${email}', '${id}', '${qty}');`).then(ret => {
                return true
            })
        }
    })
}
// cart fetch
async function getCart(client, email) {
    // this query will fetch all the non zero items from cart table
    // for a given email
    let ret = await client.query(`SELECT id, qty
	FROM public.cart WHERE email='${email}' AND qty != 0;`)
    // returns cart items
    return ret.rows
}

async function addOrder(client, order) {
    // building the sql statement to insert order details into orders table
    query = `
    INSERT INTO public.orders(
        email, "addressType", "timeStamp", items, payment, "status")
        VALUES ('${order.email}', '${order.address}', '${order.timeStamp}', ARRAY [`
    for (let i = 0; i < order.items.length; i++) {
        query += `'` + order.items[i] + `', `
    }
    query = query.slice(0,-2)
    query += ` ],'${JSON.stringify(order.paymentMethod)}', '${order.status}');`
    
    // send to database, table orders
    await client.query(query)

    // since all the cart items are purchased (successfully/unsuccesfully), remove them from the cart table
    client.query(`DELETE FROM public.cart
	WHERE email='${order.email}'`)
    return true
}

async function getOrders(client, email) {
    // fetch orders of a particular customer by email
    let response = await client.query(`
    SELECT "addressType", "timeStamp", items, payment, "status" FROM public.orders WHERE email = '${email}'`)
    // return response
    return response.rows
}

// export all functions
module.exports = {
    select,
    createUser,
    log,
    logout,
    updateAddress,
    updateCart,
    getCart,
    addOrder,
    getOrders
}