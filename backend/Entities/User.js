const Entity = require('./Entity');
const {getValidationRules} = require('../utils/validationRules')
class User extends Entity {
    constructor(user) {
      super(getValidationRules(JSON.parse(JSON.stringify(user))));
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.status  = user?.status || 'inactive';
        this.contact = user.contact;
        this.role = user.role;
    }
    getData(){
        return {
            name: this.name,
            email: this.email,
            password: this.password,
            status: this.status,
            contact: this.contact,
            role: this.role
        }
    }
  }


module.exports = User;