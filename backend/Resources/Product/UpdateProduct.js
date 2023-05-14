const Product = require('../../Entities/Product');
const Dao = require('../../store/DAOs/productDAO');
class UpdateProduct {
    constructor() {
    }
    async handle(Data) {
        if (Data.id && typeof Data.id === 'number' ) {
            const product = new Product(Data, 'update');
            const productEntity = product.getData();
            const validationErrors = product.validate(productEntity);
            if (validationErrors === null) {
                productEntity.id = Data.id
                let result = await Dao.updateProduct(productEntity);
                return result.affectedRows === 1 ?
                    { success: true, message: "Product updated successfully" } :
                    { success: false, message: 'Product not found' }
            }
            return { success: false, message: validationErrors };
        }

        return { success: false, message: "invalid data" };
    }
}
module.exports = UpdateProduct;