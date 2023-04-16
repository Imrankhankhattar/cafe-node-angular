const Entity = require('./Entity');
const { getValidationRules, getUpdateValidationRules } = require('../utils/validationRules')
class Product extends Entity {
    constructor(product, type = 'create') {
        super(type === 'update' ? getUpdateValidationRules(JSON.parse(JSON.stringify(product)), 'Product') : getValidationRules('Product'));
        this.name = product.name;
        this.description = product.description
        this.price = product.price;
        this.categoryId = product.categoryId;
        this.status = product.status;
    }
    getData() {
        return {
            name: this.name,
            description: this.description,
            price: this.price,
            categoryId: this.categoryId,
            status: this.status
        }
    }
}


module.exports = Product;