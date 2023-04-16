const Category = require('../../Entities/Category');
const categoryDao = require('../../store/DAOs/categoryDAO');
class GetCategory {
    constructor() {
    }
    async handle(Data) {
        if(Data.name){
            if(!typeof Data.name === 'string'){
                return { success: false, message: "invalid category name" };
            }
            let result = await categoryDao.getCategory(Data.name);
            return result.length > 0 ?
                { success: true, data: result } :
                { success: false, message: result.message }
        }
        let result = await categoryDao.getCategories(Data.name);
        return result.length > 0 ?
            { success: true, data: result } :
            { success: false, message: result.message }

    }
}
module.exports = GetCategory;