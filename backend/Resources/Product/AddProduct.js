const Product = require('../../Entities/Product');
const Dao = require('../../store/DAOs/productDAO');
class AddProduct {
    constructor() {
    }
    async handle(req) {
        const product = new Product(req);
        const productEntity = product.getData();
        const validationErrors = product.validate(productEntity);
        if (validationErrors === null) {
            let result = await Dao.addProduct(productEntity);
            return result.affectedRows === 1 ?
                { success: true, message: "Product added successfully" } :
                { success: false, message: result.message }
        }
        return { success: false, message: validationErrors };

    }
}
module.exports = AddProduct;