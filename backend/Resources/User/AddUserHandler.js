const User = require('../../Entities/User');
const userDao = require('../../store/DAOs/userDAO');
class AddUser {
    constructor() {
    }
    async handle(req) {
        const user = new User(req);
        const userEntity = user.getData();
        const validationErrors = user.validate(userEntity);
        if (validationErrors === null) {
            let result = await userDao.signup(userEntity);
            console.log(result);
            return result.affectedRows === 1 ?
                { success: true, message: "User added successfully" } :
                { success: false, message: result.message }
        }
        return { success: false, message: validationErrors };

    }
    _validateUser(req){
        const user = new User(req);
        const userEntity = user.getData();
        const validationErrors = user.validate(userEntity)
        return validationErrors;
    }
}
module.exports = AddUser;