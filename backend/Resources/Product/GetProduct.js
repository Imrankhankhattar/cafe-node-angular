const Dao = require('../../store/DAOs/productDAO');
class GetProduct {
    constructor() {
    }
    async handle(Data) {
        if(Data.categoryId){
            let result = await Dao.getCategoryProducts(Data.categoryId);
            return {
                success:true,
                data:result
            }
        }
        if(Data.productId){
            let result = await Dao.getProduct(Data.productId);
            return {
                success:true,
                data:result
            }
        }
        let products  = await Dao.getProducts();
        return {
            success:true,
            data:products
        }
    }
}
module.exports = GetProduct;