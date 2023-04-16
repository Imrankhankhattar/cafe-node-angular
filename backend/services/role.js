const jwt = require('jsonwebtoken');
require('dotenv').config();
function role(req, res, next) {
    if(req.body.role === 'admin'){
        next();
    }
    else{
        res.sendStatus(403);
    }
}
module.exports = { role: role }