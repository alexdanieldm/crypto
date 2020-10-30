const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.query.authorization;
    
    if (req.query.check) {
        if (!token) return res.status(401).send('Acceso Denegado');
    
        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;
            next();
        } catch (err) {
            req.status(400).send('Acceso Denegado')
        }
    } else {
        next()
    }
}