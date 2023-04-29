const Dao = require('../../store/DAOs/dashboardDao');
class DashboardDetails {
   async handle() {
        let res = await Dao.getDetails();
        if(res.success){
            return {
                success: true,
                message: "Dashboard details fetched successfully",
                data: res.data
            }
        }
        return { success: false, message: "Bill not found" }
    }
}
module.exports = DashboardDetails;