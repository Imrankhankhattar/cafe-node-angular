const db = require('../connection');
require('dotenv').config();
const categoryQueries = require('../queries/category');
class categoryDAO {
    async addCategory(category) {
        const addedCategory = await this._add(category);
        return addedCategory;
    }
    async updateCategory(category) {
        const updatedCategory = await this._update(category);
        return updatedCategory;
    }
    async getCategory(name){
        const category = await this._get(name);
        return category;
    }
    async getCategories(){
        const categories = await this._getAll();
        return categories;
    }
    async _get(name){
        return new Promise(
            (resolve, reject) => {
                db.query(categoryQueries.getCategory, [name], (err, result) => {
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
                db.query(categoryQueries.getCategories, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            }
        )
    }
    async _add(category){
        return new Promise(
            (resolve, reject) => {
                db.query(categoryQueries.addCategory, [category.name,category.description], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            }
        )
    }
    async _update(category){
        let query = `UPDATE category SET `;
    let fields = [];
    let values = [];
    for (let key in category) {
      if (key !== 'id') {
        fields.push(`${key} = ?`);
        values.push(category[key]);
      }
    }
    query += fields.join(', ');
    query += ` WHERE id = ?`;
    values.push(category.id);
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
module.exports = new categoryDAO;