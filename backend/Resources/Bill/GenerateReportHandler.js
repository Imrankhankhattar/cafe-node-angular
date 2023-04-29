const Dao = require('../../store/DAOs/billDAO');
class GenerateReport {
    async handle(Data) {
        console.log('generateReport', Data);
        let result = await Dao.generateBill(Data);
        if(result.success){
            return { success: true, message: "Bill generated successfully" ,uuid:result.uuid}
        }
        return { success: false, message: result.message }
    }
}
module.exports = GenerateReport;