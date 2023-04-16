const Dao = require('../../store/DAOs/productDAO');
class DeleteProduct {
    constructor() {
    }
    async handle(Data) {
        if (Data.id && typeof Data.id === 'number' ) {
            let result = await Dao.deleteProduct(Data.id);
            return result.affectedRows === 1 ?
                { success: true, message: "Product deleted successfully" } :
                { success: false, message: 'Product not found' }
        }
        return { success: false, message: "invalid data" };
    }
}
module.exports = DeleteProduct;