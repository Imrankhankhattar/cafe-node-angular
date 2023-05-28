const Dao = require('../../store/DAOs/billDAO');
class GetBill {
   async handle(Data) {
        if(Data.uuid){
            let res = await Dao.getBill(Data.uuid);
            return res
        }
        let res = await Dao.getBills();
        return {
            success: true,
            message: "Bills fetched successfully",
            data: res
        }
    }
}
module.exports = GetBill;