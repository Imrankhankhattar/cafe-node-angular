const Dao = require('../../store/DAOs/billDAO');
class DeleteBill {
   async handle(id) {
    console.log(id);
        let res = await Dao.deleteBill(id);
        if(res.affectedRows>0){
            return { success: true, message: "Bill deleted successfully" }
        }
        return { success: false, message: "Bill not found" }
    }
}
module.exports = DeleteBill;