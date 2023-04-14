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
    _validateUser(Data) {
        const user = new User(Data, 'update');
        const userEntity = user.getData();
        const validationErrors = user.validate(userEntity);
        return validationErrors;
    }
}
module.exports = UpdateUser;