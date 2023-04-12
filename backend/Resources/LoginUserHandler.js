const userDao = require('../store/DAOs/userDAO')

class LoginUser {
    constructor() {
    }
    async handle(Data) {

        let result = await userDao.loginUser(Data);
        if(result.length === 1 ){
            return result[0].status ==='active'?
            { success: true, message: "User logged in successfully" } : { success: false, message: "User is not active"}
        }
        else{
            return { success: false, message: "Incorrect email or password" }
        }

    }
}
module.exports = LoginUser;