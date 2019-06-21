const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');

router.get('/', user_controller.user_get_all);
router.post('/', user_controller.user_create);
router.get('/:id', user_controller.user_get_by_id);
router.put('/:id', user_controller.user_update);
router.delete('/:id', user_controller.user_delete);

module.exports = router;