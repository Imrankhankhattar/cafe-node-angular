var express = require('express');
const router = express.Router();
const resources = require('../Resources/Product');
const auth  = require('../services/authentication');
const checkRole = require('../services/role');
router.post('/add', async (req, res) => {
    try {
        const addProduct = await new resources.AddProduct().handle(req.body);
        addProduct.success === true ? res.status(200).send(addProduct) : res.status(409).send(addProduct);
    }
    catch (err) {
    }

});
router.post('/update', async (req, res) => {
    try {
        const updateProduct = await new resources.UpdateProduct().handle(req.body);
        updateProduct.success === true ? res.status(200).send(updateProduct) : res.status(409).send(updateProduct);
    } catch (error) {
        
    }
});

router.post('/get', async (req, res) => {
    try {
        const getProducts = await new resources.GetProduct().handle(req.body);
        getProducts.success === true ? res.status(200).send(getProducts) : res.status(409).send(getProducts);
    }
    catch (err) {
    }

})

router.post('/delete',async (req,res)=>{
    try {
        const deleteProduct = await new resources.DeleteProduct().handle(req.body);
        deleteProduct.success === true ? res.status(200).send(deleteProduct) : res.status(409).send(deleteProduct);
    } catch (error) {
        
    }

})

module.exports = router