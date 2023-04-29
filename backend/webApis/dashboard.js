var express = require('express');
const router = express.Router();
const resources = require('../Resources/Dashboard');

router.get('/details', async (req, res) => {
    try {
        const getCategories = await new resources.getDashboardDetails().handle();
        getCategories.success === true ? res.status(200).send(getCategories) : res.status(409).send(getCategories);
    }
    catch (err) {
    }

})

module.exports = router