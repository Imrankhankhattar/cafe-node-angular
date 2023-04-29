let ejs = require('ejs');
let uuid = require('uuid')
let pdf = require('html-pdf');
let path = require('path');
let fs = require('fs');
let options = { format: 'Letter' };
const billQueries = require('../queries/bill');
const db = require('../connection');
const { resolve } = require('path');

class billDao {
    async generateBill(data) {
        data.uuid = uuid.v4();
        let add = await this._addBill(data);
        if (add.affectedRows > 0) {
            return await this._makePdf(data);
        }
        return {
            success: false,
            message: "Error while generating report"
        }

    }
    async getBill(uuid) {
        const pdfPath = path.resolve(__dirname, `../../utils/bills/${uuid}.pdf`)
        return new Promise((resolve, reject) => {
            if (fs.existsSync(pdfPath)) {
                resolve({
                    success: true,
                    path: pdfPath
                })
            }
            else {
                resolve({
                    success: false,
                    message: "Bill not found"
                })
            }
        })
    }
    async deleteBill(id){
        return new Promise((resolve,reject)=>{
            db.query(billQueries.delete,[id],(err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }
    async getBills(){
        return new Promise((resolve,reject)=>{
            db.query(billQueries.getAll,(err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }
    _makePdf(data) {
        return new Promise(
            (resolve, reject) => {
                ejs.renderFile(path.resolve(__dirname, '../../utils/report.ejs'), { details: data }, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        pdf.create(result, options).toFile(path.resolve(__dirname, `../../utils/bills/${data.uuid}.pdf`), function (err, res) {
                            if (err) {
                                reject({
                                    success: false,
                                    message: "Error while generating report",
                                    error: err
                                });
                            } else {
                                resolve({
                                    success: true,
                                    message: "Report generated successfully",
                                    uuid: `${data.uuid}.pdf`
                                });
                            }
                        });
                    }
                })
            }
        )
    }
    _addBill(data) {
        return new Promise(
            (resolve, reject) => {
                db.query(billQueries.add, [data.uuid, data.name, data.email, data.contact, data.paymentMethod, data.totalAmount, data.items], (err, result) => {
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

module.exports = new billDao;