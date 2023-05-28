const userDao = require('../../store/DAOs/userDAO');
const User = require('../../Entities/User');
class UpdateUser {
    constructor() {
    }
    async handle(Data) {
        console.log(Data);
        if (Data.id) {
            const user = new User(Data, 'update');
            const userEntity = user.getData();
            const validationErrors = user.validate(userEntity);
            console.log(validationErrors);
            if (validationErrors === null) {
                let result = await userDao.updateUser(Data)
                return result.affectedRows === 1 ?
                    { success: true, message: "User updated successfully" } :
                    { success: false, message: result.message }
            }
            return { success: false, message: "User not found" }
        }

        return { success: false, message: "User not found" };
    }
    async UpdatePassword(Data) {
        let validationErrors = this._validatePasswordData(Data)
        if (validationErrors.length>0) {
            return { success: false, message: validationErrors };
        }
        let result = await userDao.UpdatePassword(Data);
        return result.affectedRows === 1 ? { success: true, message: "Password updated successfully" } : { success: false, message: result.message };
        
    }
    _validatePasswordData(Data) {
        let errors = [];
        if (!Data.email) {
            errors.push("Email is required");
        }
        if (!Data.oldPassword) {
            errors.push("Old password is required");
        }
        if (!Data.newPassword) {
            errors.push("New password is required");
        }
        if (typeof Data.email !== 'string') {
            errors.push("Email must be a string");
        }
        if (typeof Data.oldPassword !== 'string') {
            errors.push("Old password must be a string");
        }
        if (typeof Data.newPassword !== 'string') {
            errors.push("New password must be a string");
        }
        if (Data.oldPassword.length < 6) {
            errors.push("Old password must be at least 6 characters long");
        }
        if (Data.newPassword.length < 6) {
            errors.push("New password must be at least 6 characters long");
        }
        return errors;
    }
    
    async validateToken(Data) {
        if (Data.token && typeof Data.token === 'string') {
            let result = await userDao.validateToken(Data.token);
            return result
        }
        return {
            status: false,
            message: "invalid Token"
        }
    }
}
module.exports = UpdateUser;