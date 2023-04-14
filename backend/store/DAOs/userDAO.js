const userQueries = require('../queries/user');
const db = require('../connection');
let { getHashPassword, comparePasswords } = require('../bcrypt');
const jwt = require('jsonwebtoken');
let { sendEmail } = require('../nodemailer')
require('dotenv').config();
class userDao {
  async signup(user) {
    const isEmailUnique = await this._checkEmailUniqueness(user.email);
    if (!isEmailUnique) {
      return { status: 409, message: 'Email already exists' };
    }
    let hashPassword = await getHashPassword(user.password);
    user.password = hashPassword
    const addedUser = await this._insertUser(user);
    return addedUser;
  }
  async login(user) {
    const userData = await this._getUserWithPassword(user.email);
    if (!userData) {
      return { message: 'Invalid credentials' };
    }
    const isValidPassword = await comparePasswords(user.password, userData[0].password);
    if (!isValidPassword) {
      return { message: 'Invalid credentials' };
    }
    const token = this._generateToken(userData.email, userData.role);
    userData[0].token = token;
    return userData;
  }
  async forgotPassword(user) {
    const userData = await this._getUserByEmail(user.email);
    if (!userData) {
      return { message: 'Invalid credentials' };
    }
    let randomPassword = Math.random().toString(36).slice(-8);
    let hashPassword = await getHashPassword(randomPassword);
    user.password = hashPassword
    const updatedUser = await this._updatePassword(user);
    if (updatedUser) {
      return sendEmail(user.email, randomPassword)
    }
  }
  async updateUser(user) {
    console.log(user);
    const updatedUser = await this._updateUserByEmail(user);
    return updatedUser;
  }
  async getUsers(role) {
    const getUsers = this._getUsersByRole(role);
    return getUsers;
  }
  async getUser(email) {
    const getUser = this._getUserByEmail(email);
    return getUser;
  }

  // helper functions
  async _getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query(userQueries.getUserByEmail, [email], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  async _getUserWithPassword(email){
    return new Promise((resolve, reject) => {
      db.query(userQueries.getUserWithPassword, [email], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  _generateToken(email, role) {
    const tokenData = {
      email: email,
      role: role
    }
    return jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24
    });
  }
  async _checkEmailUniqueness(email) {
    return new Promise((resolve, reject) => {
      db.query(userQueries.checkUniqueEmail, [email], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0].count === 0);
        }
      });
    });
  }
  async _insertUser(user) {
    return new Promise((resolve, reject) => {
      db.query(userQueries.addUser, [user.name, user.email, user.password, user.status, user.contact, user.role], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  _getTokenPayload(token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        return decodedToken
      }
    });
  }
  async _updatePassword(user) {
    return new Promise((resolve, reject) => {
      db.query(userQueries.updatePassword, [user.password, user.email], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  async _updateUserByEmail(user) {
    let query = `UPDATE user SET `;
    let fields = [];
    let values = [];
    for (let key in user) {
      if (key !== 'email') {
        fields.push(`${key} = ?`);
        values.push(user[key]);
      }
    }
    query += fields.join(', ');
    query += ` WHERE email = ?`;
    values.push(user.email);
    return new Promise((resolve, reject) => {
      db.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }) 
  }
  _getUsersByRole(role) {
    return new Promise((resolve, reject) => {
      db.query(userQueries.getUsers, [role], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
module.exports = new userDao;