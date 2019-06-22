const express = require('express');
const router = express.Router();

const studentController = require('../controllers/student.controller');

router.get('/', studentController.studentGetAll);
router.get('/:id', studentController.studentGetById);
router.post('/', studentController.studentCreate);
router.put('/:id', studentController.studentUpdate);
router.delete('/:id', studentController.studentDelete);

module.exports = router;
