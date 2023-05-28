const Category = require('../../Entities/Category');
const categoryDao = require('../../store/DAOs/categoryDAO');
class AddCategory {
    constructor() {
    }
    async handle(req) {
        const category = new Category(req);
        const categoryEntity = category.getData();
        const validationErrors = category.validate(categoryEntity);
        if (validationErrors === null) {
            let result = await categoryDao.addCategory(categoryEntity);
            return result.affectedRows === 1 ?
                { success: true, message: "Category added successfully" } :
                { success: false, message: result.message }
        }
        return { success: false, message: validationErrors };

    }
}
module.exports = AddCategory;