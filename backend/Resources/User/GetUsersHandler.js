const userDAO = require('../../store/DAOs/userDAO');
const userDao = require('../../store/DAOs/userDAO');
class GetUsers {
    constructor() {
    }
    async handle(Data) {
        if(Data.email){
            let users = await userDAO.getUser(Data.email);
            return users.length > 0 ? { success: true, data: users } : { success: false, message: "No user found" };
        }
        else if(Data.role){
            let users = await userDAO.getUsers(Data.role);
            return users.length > 0 ? { success: true, data: users } : { success: false, message: "No user found" };
        }
        else{
            return { success: false, message: "email or role not provided!" }
        }
    }
}
module.exports = GetUsers;