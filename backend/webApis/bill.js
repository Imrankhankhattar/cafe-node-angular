var express = require('express');
const router = express.Router();
const resources = require('../Resources/Bill');
const fs = require('fs')
router.post('/generateBill', async (req, res) => {
    try {
        const generateReport = await new resources.generateReport().handle(req.body);
        generateReport.success === true ? res.status(200).send(generateReport) : res.status(409).send(generateReport);
    } catch (error) {

    }
})

router.post('/getBill', async (req, res) => {
    try {
        const bill = await new resources.getBill().handle(req.body);
        if (bill.path) {
            res.contentType("application/pdf");
            const stream = fs.createReadStream(bill.path);
            stream.on('error', (err) => {
                console.error(err);
            });
            stream.pipe(res);

        }
        else{
            res.status(409).send({
                success: false,
                message: "Bill not found"
            });
        }

    } catch (error) {

    }
});
router.post('/getBills',async (req,res)=>{
    try{
        req.body = {}
        const getBills = await  new resources.getBill().handle(req.body);
        getBills.success === true ? res.status(200).send(getBills) : res.status(409).send(getBills);
    }catch(err){

    }
})
router.delete('/delete/:id',async (req,res)=>{
    try{
        const deleteBill = await new resources.deleteBill().handle(req.params.id);
        deleteBill.success === true ? res.status(200).send(deleteBill) : res.status(409).send(deleteBill);
    }catch(err){

    }
})

module.exports = router