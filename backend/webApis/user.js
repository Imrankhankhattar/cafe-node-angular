var express = require('express');
const router = express.Router();
const resources = require('../Resources');
router.post('/signup', async (req, res) => {
    try {
        const addUser = await new resources.AddUser().handle(req.body);
        addUser.success === true ? res.status(200).send(addUser) : res.status(409).send(addUser);
    }
    catch (err) {
    }
});

router.post('/login', async (req, res) => {
    try {
        const login = await new resources.LoginUser().handle(req.body);
        login.success === true ? res.status(200).send(login) : res.status(401).send(login);
    }
    catch (err) {
    }
});
module.exports = router