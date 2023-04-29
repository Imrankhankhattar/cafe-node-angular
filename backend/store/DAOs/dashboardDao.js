const db = require('../connection');
const dashboardQueries = require('../queries/dashboard');
class dashboardDAO {
    async getDetails() {
        const products = await this._getProductCount();
        const categories = await this._getCategoryCount();
        const billCount = await this._getBillsCount();
        let details = {
            products:products[0].count,categories:categories[0].count,billCount:billCount[0].count};
        return new Promise( (resolve, reject) => {
            resolve({
                success: true,
                data: details
            });
        })
    }
    async _getProductCount(){
        return new Promise(
            (resolve, reject) => {
                db.query(dashboardQueries.productCount, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            }
        )
    }
    async _getCategoryCount(){
        return new Promise(
            (resolve, reject) => {
                db.query(dashboardQueries.categoryCount, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            }
        )
    }
    async _getBillsCount(){
        return new Promise(
            (resolve, reject) => {
                db.query(dashboardQueries.billCount, (err, result) => {
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


module.exports = new dashboardDAO();