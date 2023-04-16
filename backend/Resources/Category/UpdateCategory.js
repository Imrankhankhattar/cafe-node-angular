const Category = require('../../Entities/Category');
const categoryDao = require('../../store/DAOs/categoryDAO');
class UpdateCategory {
    constructor() {
    }
    async handle(req) {
        if (req.id && typeof req.id === 'number' && (req.name || req.description)) {
            const category = new Category(req, 'update');
            const categoryEntity = category.getData();
            const validationErrors = category.validate(categoryEntity);
            if (validationErrors === null) {
                categoryEntity.id = req.id
                let result = await categoryDao.updateCategory(categoryEntity);
                return result.affectedRows === 1 ?
                    { success: true, message: "Category updated successfully" } :
                    { success: false, message: 'Category not found' }
            }
            return { success: false, message: validationErrors };
        }

        return { success: false, message: "invalid data" };
    }
}
module.exports = UpdateCategory;