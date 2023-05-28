const bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = 15

const getHashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
                reject(err)
            }
            resolve(hash)
        });
    })

};

const comparePasswords = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, result) {
            if (err) {
                reject(err)
            }
            resolve(result)
        });
    })
};

module.exports = {
    getHashPassword,comparePasswords
}