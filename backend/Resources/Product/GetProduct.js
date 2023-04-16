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
        let results  = await Dao.getProducts();
        return results;
    }
}
module.exports = GetProduct;