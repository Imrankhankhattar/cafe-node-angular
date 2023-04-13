const userQueries = require('../queries/user');
const db = require('../connection');
let { getHashPassword,comparePasswords} = require('../bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require("nodemailer");
class userDao{
  async addUser(user){
     let hashPassword = await getHashPassword(user.password);
      return new Promise(
        (resolve, reject) => {
          let userCount = db.query(userQueries.checkUniqueEmail,
            [user.email], (err, result) => {
              if (err) {
                reject(err);
              }
              if(result[0].count ===0){
                db.query(
                  userQueries.addUser,
                  [user.name, user.email, hashPassword, user.status, user.contact, user.role],
                  (err, result) => {
                    if (err) {
                      reject(err);
                    }
                    console.log(result);
                    resolve(result);
                   
                  }
                )
              }
              else{
                resolve({status: 409, message: "Email already exists"})
              }
            })
        }
      )

      
    }
    async loginUser(user){
      return new Promise(
        (resolve, reject) => {
          db.query(
            userQueries.loginUser,
            [user.email],
            async (err, result) => {
              if (err) {
                reject(err);
              }
              else{
                if (await comparePasswords(user.password,result[0].password)) {
                  const tokenData = {
                    email: result[0].email,
                    role: result[0].role
                  }
                  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 24
                  });
                  result[0].token = token;
                  resolve(result);
                } else {
                  resolve({status: 401, message: "Invalid credentials"});
                }
              }
            }
          )
        }
      );
    }
    async forgotPassword (){
      
    }
}
module.exports = new userDao;