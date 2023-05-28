const Entity = require('./Entity');
const { getValidationRules, getUpdateValidationRules } = require('../utils/validationRules')
class User extends Entity {
  constructor(user, type = 'create') {
    super(type === 'update' ? getUpdateValidationRules(JSON.parse(JSON.stringify(user)), 'user') : getValidationRules('user'));
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.status = false;
    this.contact = user.contact;
    this.role = user.role;
  }
  getData() {
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