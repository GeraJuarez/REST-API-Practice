const express = require('express');
const router = express.Router();

const courseController = require('../controllers/course.controller');

router.get('/', courseController.courseGetAll);
router.get('/:id', courseController.courseGetById);
router.post('/', courseController.courseCreate);
router.put('/:id', courseController.courseUpdate);
router.delete('/:id', courseController.courseDelete);

module.exports = router;
