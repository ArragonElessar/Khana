// this file contains all the database functions for postgres
// client object is passed from app.js as a parameter for every function call
// all the functions here are exported to app.js


// test function, never actually used
const select_all = (client) => {
    // passes a simple sql query
    client.query('SELECT * FROM users', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            console.log(JSON.stringify(row));
        }
        //client.end();
    });
}

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
async function create_user(client, name, email, password) {
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
async function update_address(client, type, email, address) {
    // update home/work/other (type) col of users table with address given by 
    // user 
    client.query(`UPDATE public.users
	SET ${type} = '${address}'
	WHERE email='${email}';`).then(ret => {
        return true
    })
}
// cart adder
async function cart(client, email, id, qty) {
    client.query(`SELECT qty FROM public.cart 
    WHERE email='${email}' AND id='${id}'`).then(ret => {
        if (ret.rows.length > 0) {
            // exists update
            client.query(`UPDATE public.cart
            SET qty='${qty}'
            WHERE email='${email}' AND id='${id}';`).then(ret => {
                return true;
            })
        } else {
            client.query(`INSERT INTO public.cart(
                email, id, qty)
                VALUES ('${email}', '${id}', '${qty}');`).then(ret => {
                return true
            })
        }
    })
}

module.exports = {
    select_all,
    select,
    create_user,
    log,
    logout,
    update_address,
    cart
}