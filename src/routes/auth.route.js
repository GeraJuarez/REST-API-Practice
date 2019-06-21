const express = require('express');
const router = express.Router();

const auth_controller = require('../middleware/auth.controller');
// const verify_token = require('../middleware/VerifyToken');

router.post('/login', auth_controller.login);
router.get('/logout', auth_controller.logout);
router.post('/register', auth_controller.register);

module.exports = router;
