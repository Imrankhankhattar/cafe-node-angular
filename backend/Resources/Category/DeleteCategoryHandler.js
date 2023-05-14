const categoryDao = require('../../store/DAOs/categoryDAO');
class DeleteCategory {
    constructor() {
    }
    async handle(req) {
        if (req.id && typeof req.id === 'number') {
            let result = await categoryDao.deleteCategory(req.id);
            return result.affectedRows === 1 ?
                { success: true, message: "Category deleted successfully" } :
                { success: false, message: 'Category not found' }
        }

        return { success: false, message: "invalid category" };
    }
}
module.exports = DeleteCategory;