const express = require('express');
const router = express.Router();

const product_controller = require('../controllers/product.controller');
//var VerifyToken = require('../middleware/VerifyToken');
//router.get('/test', [VerifyToken, product_controller.test]);

router.post('/create', product_controller.product_create);
router.get('/:id', product_controller.product_details);
router.delete('/:id/delete', product_controller.product_delete);

module.exports = router;
