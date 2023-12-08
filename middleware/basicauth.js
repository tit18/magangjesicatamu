const BasicAuth = ((req, res, next) => {
    const auth = { Username: 'MokletHebat', password: 'P3rtninidfr?67' }
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [Username, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    if (Username && password && Username === auth.Username && password === auth.password) {
        return next()
    }

    res.set('WWW-Authenticate', 'Basic realm="401"')
    res.status(401).send('Authentication required.')
})

module.exports = { BasicAuth };