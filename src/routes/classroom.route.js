const express = require('express');
const router = express.Router();

const classroomController = require('../controllers/classroom.controller');

router.get('/', classroomController.classroomGetAll);
router.get('/:id', classroomController.classroomGetById);
router.post('/', classroomController.classroomCreate);
router.put('/:id', classroomController.classroomUpdate);
router.delete('/:id', classroomController.classroomDelete);

module.exports = router;
