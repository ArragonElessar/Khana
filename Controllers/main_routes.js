const index = (req, res, session) => {
    console.log(session)
    res.render('index', { title: 'Home', session: session })
}

const login = (req, res, session) => {
    console.log(session)
    res.render('login', { title: 'Login', session: session })
}


const register = (req, res, session) => {
    console.log(session)
    res.render('register', { title: 'Register', session: session })
}

const address = (req, res, session) => {
    console.log(session)
    res.render('address', { title: 'Address', session: session })
}


module.exports = {
    index,
    login,
    register,
    address
}