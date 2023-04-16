const addCategory = `INSERT INTO category (name, description) VALUES (?, ?)`;
const getCategories = `SELECT name,description FROM category ORDER BY name`;
const getCategory = `SELECT name,description FROM category WHERE name = ?`;

module.exports = {
    addCategory,
    getCategories,
    getCategory
}
