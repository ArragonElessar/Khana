const index = (req, res, session, key) => {
    res.render('index', { title: 'Home', session, key: key })
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

const menu = (req, res, session) => {
    if (session.login_state) {
        res.render('menu', { title: 'Menu', session })
    }
    else {
        res.redirect('login')
    }
}

module.exports = {
    index,
    login,
    register,
    address,
    menu,
}
