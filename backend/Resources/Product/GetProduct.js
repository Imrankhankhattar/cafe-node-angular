const Dao = require('../../store/DAOs/productDAO');
class GetProduct {
    constructor() {
    }
    async handle(Data) {
        if(Data.categoryId){
            let result = await Dao.getCategoryProducts(Data.categoryId);
            return result;
        }
        if(Data.id){
            let result = await Dao.getProduct(Data.id);
            return result;
        }
        let products  = await Dao.getProducts();
        return {
            success:true,
            data:products
        }
    }
}
module.exports = GetProduct;