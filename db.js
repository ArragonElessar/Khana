const select_all = (client) => {
    client.query('SELECT * FROM users', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            console.log(JSON.stringify(row));
        }
        //client.end();
    });
}
async function log(client, email, message) {
    await client.query(`INSERT INTO public.user_log(email, log) VALUES ('${email}', '${message}')`)

}
async function select(client, out_field, in_field, in_value) {
    let ret = await client.query(`SELECT ${out_field} FROM users WHERE ${in_field} = '${in_value}'`)
    return ret.rows
}

async function create_user(client, name, email, password) {
    let ret = await select(client, 'id', 'email', email)
    if (ret.length > 0) {
        console.log('user already exists')
        return false;
    } else {
        console.log('user does not exist already')
        client.query(`INSERT INTO public.users(name, email, password) VALUES ('${name}', '${email}', '${password}');`).then(ret => {
            console.log('user added');
        })
        return true;
    }
}
module.exports = {
    select_all,
    select,
    create_user,
    log
}