const userDao = require('../../store/DAOs/userDAO');
const User = require('../../Entities/User');
class UpdateUser {
    constructor() {
    }
    async handle(Data) {
        if (Data.email) {
            const user = new User(Data, 'update');
            const userEntity = user.getData();
            const validationErrors = user.validate(userEntity);
            if (validationErrors === null) {
                let result = await userDao.updateUser(Data)
                console.log('result',result);
                return result.affectedRows === 1 ?
                    { success: true, message: "User updated successfully" } :
                    { success: false, message: result.message }
            }
            return { success: false, message: "User not found" }
        }

        return { success: false, message: "User not found" };
    }
    async UpdatePassword(Data){
        let result = await userDao.UpdatePassword(Data);
        return result.affectedRows === 1 ? { success: true, message: "Password updated successfully" } : { success: false, message: "Incorrect email or token" };
    }
    async validateToken(Data){
        if(Data.token && typeof Data.token === 'string'){
            let result = await userDao.validateToken(Data.token);
            return result
        }
        return{
            status :false,
            message:"invalid Token"
        }
    }
}
module.exports = UpdateUser;