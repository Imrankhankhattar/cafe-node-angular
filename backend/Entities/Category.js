const Entity = require('./Entity');
const { getValidationRules, getUpdateValidationRules } = require('../utils/validationRules')
class Category extends Entity {
    constructor(category, type = 'create') {
        super(type === 'update' ? getUpdateValidationRules(JSON.parse(JSON.stringify(category)), 'category') : getValidationRules('category'));
        this.name = category.name;
        this.description = category.description
    }
    getData() {
        return {
            name: this.name,
            description: this.description
        }
    }
}


module.exports = Category;