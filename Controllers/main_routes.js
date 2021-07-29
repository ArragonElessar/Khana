const index = (req, res) => {
    res.render('index', { title: 'Home' })
}

const login = (req, res) => {
    res.render('login', { title: 'Login' });
}

const register = (req, res) => {
    res.render('register', { title: 'Register' });
}
const address = (req, res) => {
    res.render('address', { title: 'Address' });
}

module.exports = {
    index,
    login,
    register,
    address
}