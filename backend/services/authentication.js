const jwt = require('jsonwebtoken');
require('dotenv').config();
function authenticateToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')[1];
        jwt.verify(bearer, process.env.JWT_SECRET, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                next();
            }
        });
    } else {
        res.sendStatus(401);
    }
}
module.exports = { authenticateToken: authenticateToken }