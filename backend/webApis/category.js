var express = require('express');
const router = express.Router();
const resources = require('../Resources/Category');
const auth  = require('../services/authentication');
const checkRole = require('../services/role');
router.post('/add', async (req, res) => {
    try {
        const addCategory = await new resources.addCategory().handle(req.body);
        addCategory.success === true ? res.status(200).send(addCategory) : res.status(409).send(addCategory);
    }
    catch (err) {
    }
});
router.post('/update', async (req, res) => {
    try {
        const updateCategory = await new resources.updateCategory().handle(req.body);
        updateCategory.success === true ? res.status(200).send(updateCategory) : res.status(409).send(updateCategory);
    }
    catch (err) {
    }
});

router.post('/get', async (req, res) => {
    try {
        const getCategories = await new resources.getCategories().handle(req.body);
        getCategories.success === true ? res.status(200).send(getCategories) : res.status(409).send(getCategories);
    }
    catch (err) {
    }
})

module.exports = router