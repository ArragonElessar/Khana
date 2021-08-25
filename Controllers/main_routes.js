// review what all pages actually use the session parameters

const index = (req, res, key) => {
    res.render('index', { title: 'Home', session: req.session, key: key })
}

const login = (req, res) => {
    res.render('login', { title: 'Login', session: req.session })
}


const register = (req, res) => {
    res.render('register', { title: 'Register', session: req.session })
}

const address = (req, res, states_list, default_type) => {
    if (req.session.login_state) {
        res.render('address', { title: 'Address', session: req.session, states_list, type: default_type })
    } else {
        res.redirect('/login')
    }

}

const menu = (req, res) => {
    if (req.session.login_state) {
        res.render('menu', { title: 'Menu', session: req.session })
    }
    else {
        res.redirect('/login')
    }
}

const checkout = (req, res) => {
    if (req.session.login_state) {
        res.render('checkout', { title: 'Checkout', session: req.session })
    }
    else {
        res.redirect('login')
    }

}
const payment = (req, res) => {
    if (req.session.login_state) {
        res.render('payment', { title: 'Payment', session: req.session })
    }
    else {
        res.redirect('login')
    }
}

const history = (req, res) => {
    if (req.session.login_state) {
        res.render('history', { title: 'Orders', session: req.session })
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
    checkout,
    payment,
    history
}
