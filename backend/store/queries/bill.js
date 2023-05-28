const addBill = `INSERT INTO bill (uuid,name,email,contact,paymentMethod,total,productDetails) VALUES (?,?,?,?,?,?,?)`;
const getBills =
    `SELECT id,uuid,name,email,contact,paymentMethod,total,productDetails FROM bill ORDER BY uuid`;
const deleteBill = 
    `DELETE FROM bill WHERE id = ?`;
module.exports = {
    add: addBill,
    getAll: getBills,
    delete: deleteBill
}