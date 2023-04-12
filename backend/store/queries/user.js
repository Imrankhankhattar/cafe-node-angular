
const checkUniqueEmail =  `SELECT COUNT(*) AS count FROM user WHERE email = ?`
const addUser  =  `INSERT INTO user (name, email, password, status, contact, role) VALUES (?, ?, ?, ?, ?, ?)`
const loginUser =   `SELECT email,password,status FROM user WHERE email = ?`
module.exports = {
    checkUniqueEmail,
    addUser,
    loginUser
}