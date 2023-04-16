const add = `INSERT INTO product(name, description, price,status, categoryId)VALUES(?, ?, ?, ?, ?)`;
const get = `SELECT name, description, price,status FROM product WHERE id = ?`;
const getAllWithCategoryDetails =
    `SELECT p.id, p.name, p.description, p.price, p.status, c.name as categoryName, c.description as categoryDescription
    FROM product p
    INNER JOIN category c ON p.categoryId = c.id
    ORDER BY p.name`;
const getByCategory = `SELECT id, name, description, price,status FROM product WHERE categoryId = ? ORDER BY name`;
const del = `DELETE FROM product WHERE id = ?`;

module.exports = {
    addProduct: add,
    getProduct: get,
    getProductsByCategory: getByCategory,
    getProducts: getAllWithCategoryDetails,
    deleteProduct:del
}
