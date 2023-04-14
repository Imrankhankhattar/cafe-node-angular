const userDao = require('../../store/DAOs/userDAO')

class LoginUser {
    constructor() {
    }
    async handle(Data) {

        let result = await userDao.login(Data);
        if(result.length === 1 ){
            return result[0].status ==='active'?
            { success: true,token : result[0].token ,message: "User logged in successfully" } : { success: false, message: "User is not active"}
        }
        else{
            return { success: false, message: "Incorrect email or password" }
        }

    }
    async ForgotPassword(Data){
        let result = await userDao.forgotPassword(Data);
        return result.accepted.length > 0 ? { success: true, message: "Email sent successfully" } : { success: false, message: "Incorrect email" };
    }
}
module.exports = LoginUser;