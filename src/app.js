const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');

const auth = require('./routes/auth.route');
const director = require('./routes/director.route');
const student = require('./routes/student.route');
const professor = require('./routes/professor.route');

const course = require('./routes/course.route');
const classroom = require('./routes/classroom.route');
const group = require('./routes/group.route');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/auth', auth);
app.use('/api/directors', director);
app.use('/api/students', student);
app.use('/api/professors', professor);

app.use('/api/courses', course);
app.use('/api/classrooms', classroom);
app.use('/api/groups', group);

module.exports = app;