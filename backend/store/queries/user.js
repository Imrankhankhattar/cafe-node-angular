
const checkUniqueEmail =  `SELECT COUNT(*) AS count FROM user WHERE email = ?`
const addUser  =  `INSERT INTO user (name, email, password, status, contact, role) VALUES (?, ?, ?, ?, ?, ?)`
const getUserByEmail =   `SELECT email,password,status,role FROM user WHERE email = ?`
const updatePassword = `UPDATE user SET password = ? WHERE email = ?`
module.exports = {
    checkUniqueEmail,
    addUser,
    getUserByEmail,
    updatePassword
}