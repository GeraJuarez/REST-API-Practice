const express = require('express');
const router = express.Router();

const gradeController = require('../controllers/grade.controller');

router.get('/', gradeController.getAll);
router.get('/:id', gradeController.getById);
router.post('/', gradeController.create);
router.put('/:id', gradeController.update);
router.delete('/:id', gradeController.delete);

module.exports = router;
