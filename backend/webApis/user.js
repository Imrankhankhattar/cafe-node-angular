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
router.post('/forgot-password', async (req, res) => {
    try {
        const forgotPassword = await new resources.LoginUser().ForgotPassword(req.body);
        forgotPassword.success === true ? res.status(200).send(forgotPassword) : res.status(401).send(forgotPassword);
    }
    catch (err) {
    }
})
module.exports = router