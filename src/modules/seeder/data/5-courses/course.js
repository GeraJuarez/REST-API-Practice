const { getObjectId } = require('../../helpers');

const courses = ['Math', 'History', 'OOP'];

const min = 1;
const max = 5;

module.exports = courses.map(course => ({
    name: course,
    semesterLevel: Math.floor(Math.random() * (max - min + 1)) + min,
    hasProject: true,
    maxFailingGrade: 70,
    _id: getObjectId(course),
}));