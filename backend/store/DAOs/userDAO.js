const userQueries = require('../queries/user');
const db = require('../connection');
let { getHashPassword, comparePasswords } = require('../bcrypt');
const jwt = require('jsonwebtoken');
let { sendEmail } = require('../nodemailer')
require('dotenv').config();
class userDao {
  async signup(user) {
    const isEmailUnique = await this.checkEmailUniqueness(user.email);
    if (!isEmailUnique) {
      return { status: 409, message: 'Email already exists' };
    }
    let hashPassword = await getHashPassword(user.password);
    user.password = hashPassword
    const addedUser = await this.insertUser(user);
    return addedUser;
  }
  async login(user) {
    const userData = await this.getUserByEmail(user.email);
    if (!userData) {
      return { message: 'Invalid credentials' };
    }
    const isValidPassword = await comparePasswords(user.password, userData[0].password);
    if (!isValidPassword) {
      return { message: 'Invalid credentials' };
    }
    const token = this.generateToken(userData.email, userData.role);
    userData[0].token = token;
    return userData;
  }
  async forgotPassword(user) {
    const userData = await this.getUserByEmail(user.email);
    if (!userData) {
      return { message: 'Invalid credentials' };
    }
    let randomPassword = Math.random().toString(36).slice(-8);
    let hashPassword = await getHashPassword(randomPassword);
    user.password = hashPassword
    const updatedUser = await this.updatePassword(user);
    if (updatedUser) {
      return sendEmail(user.email, randomPassword)
    }
  }

  // supporting functions
  async getUserByEmail(email) {
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
  generateToken(email, role) {
    const tokenData = {
      email: email,
      role: role
    }
    return jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24
    });
  }
  async checkEmailUniqueness(email) {
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
  async insertUser(user) {
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
  getTokenPayload(token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        return decodedToken
      }
    });
  }
  async updatePassword(user) {
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
}
module.exports = new userDao;