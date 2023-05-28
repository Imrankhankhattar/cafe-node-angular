
const checkUniqueEmail =  `SELECT COUNT(*) AS count FROM user WHERE email = ?`
const addUser  =  `INSERT INTO user (name, email, password, status, contact, role) VALUES (?, ?, ?, ?, ?, ?)`
const getUserByEmail =   `SELECT email,status,role FROM user WHERE email = ?`
const getUserWithPassword = `SELECT email,password,status,role FROM user WHERE email = ?`
const updatePassword = `UPDATE user SET password = ? WHERE email = ?`
const updateUserByEmail = `UPDATE user SET name = ?,status = ?, contact = ?, role = ? WHERE email = ?`
const getUsers = `SELECT id,user.name,user.email,user.status,user.contact,user.role FROM user WHERE user.role = ?`
module.exports = {
    checkUniqueEmail,
    addUser,
    getUserByEmail,
    updatePassword,
    updateUserByEmail,
    getUsers,
    getUserWithPassword
}