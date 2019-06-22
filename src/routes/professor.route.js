const express = require('express');
const router = express.Router();

const professorController = require('../controllers/professor.controller');

router.get('/', professorController.professorGetAll);
router.get('/:id', professorController.professorGetById);
router.post('/', professorController.professorCreate);
router.put('/:id', professorController.professorUpdate);
router.delete('/:id', professorController.professorDelete);

module.exports = router;
