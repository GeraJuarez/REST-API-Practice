const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/VerifyToken');

const directorController = require('../controllers/director.controller');

router.get('/', directorController.directorGetAll);
router.get('/:id', directorController.directorGetById);
router.post('/', verifyToken.isDirector, directorController.directorCreate);
router.put('/:id', directorController.directorUpdate);
router.delete('/:id', directorController.directorDelete);

module.exports = router;
