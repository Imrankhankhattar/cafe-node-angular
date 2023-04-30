const userDao = require('../../store/DAOs/userDAO')

class LoginUser {
    constructor() {
    }
    async handle(Data) {

        if(Data.email && Data.password && this._isValidEmail(Data.email)){
            let result = await userDao.login(Data);
        if (result.length === 1) {
            return result[0].status === 'active' ?
                { success: true, token: result[0].token, message: "User logged in successfully" } : { success: false, message: "User is not active" }
        }
        else {
            return { success: false, message: result.message }
        }
        }
        return {
            success: false, message: "Incorrect email or password"
        }

    }
    async ForgotPassword(Data) {
        if (Data.email && this._isValidEmail(Data.email)) {
            let result = await userDao.forgotPassword(Data);
            return result.success === true? { success: true, message: "Email sent successfully" } : { success: false, message: result.message };
        }
        return {
            success: false, message: "Incorrect email"
        }
    }
    _isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

}
module.exports = LoginUser;