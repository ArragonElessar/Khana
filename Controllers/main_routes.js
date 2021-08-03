const index = (req, res, session) => {
    res.render('index', { title: 'Home', session })
}

const login = (req, res, session) => {
    res.render('login', { title: 'Login', session })
}


const register = (req, res, session) => {
    res.render('register', { title: 'Register', session })
}

const address = (req, res, session, states_list) => {
    if (session.login_state) {
        res.render('address', { title: 'Address', session, states_list })
    } else {
        res.redirect('login')
    }

}


module.exports = {
    index,
    login,
    register,
    address
}
