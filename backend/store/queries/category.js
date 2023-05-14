const addCategory = `INSERT INTO category (name, description) VALUES (?, ?)`;
const getCategories = `SELECT id,name,description FROM category ORDER BY name`;
const getCategory = `SELECT id,name,description FROM category WHERE name = ?`;
const deleteCategory = `DELETE FROM category WHERE id = ?`;
const deleteProductsByCategory =`DELETE FROM product WHERE categoryId = ?`;
module.exports = {
    addCategory,
    getCategories,
    getCategory,
    deleteCategory,
    deleteProductsByCategory
}
