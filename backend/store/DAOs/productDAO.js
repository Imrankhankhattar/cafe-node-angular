const db = require('../connection');
require('dotenv').config();
const productQueries = require('../queries/product');
class productDAO {
    async addProduct(product) {
        const addedProduct = await this._add(product);
        return addedProduct;
    }
    async updateProduct(product) {
        console.log('product');
        const updatedProduct = await this._update(product);
        return updatedProduct;
    }
    async getProduct(id){
        const product = await this._get(id);
        return product;
    }
    async getProducts(){
        const products = await this._getAll();
        return products;
    }
    async getCategoryProducts(categoryId){
        const products = await this._getByCategory(categoryId);
        return products;
    }
    async deleteProduct(productId){
        const result = await this._delete(productId);
        return result;
    }
    async _delete(productId){
        return new Promise(
            (resolve, reject) => {
                db.query(productQueries.deleteProduct, [productId], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            }
        )
    }
    async _getByCategory(categoryId){
        return new Promise(
            (resolve, reject) => {
                db.query(productQueries.getProductsByCategory, [categoryId], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            }
        )
    }
    async _get(id){
        return new Promise(
            (resolve, reject) => {
                db.query(productQueries.getProduct, [id], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            }
        )
    }
    async _getAll(){
        return new Promise(
            (resolve, reject) => {
                db.query(productQueries.getProducts, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            }
        )
    }
    async _add(product){
        return new Promise(
            (resolve, reject) => {
                db.query(productQueries.addProduct, [product.name,product.description,product.price,product.status,product.categoryId], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            }
        )
    }
    async _update(product){
        let query = `UPDATE product SET `;
    let fields = [];
    let values = [];
    for (let key in product) {
      if (key !== 'id') {
        fields.push(`${key} = ?`);
        values.push(product[key]);
      }
    }
    query += fields.join(', ');
    query += ` WHERE id = ?`;
    values.push(product.id);
        return new Promise(
            (resolve, reject) => {
                db.query(query, values, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            }
        )
    }
    
}
module.exports = new productDAO;