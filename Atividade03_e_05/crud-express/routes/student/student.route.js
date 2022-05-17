var StudentService = require('../../services/student/student.service');
var express = require('express');
var router = express.Router();

router.post('/create', function (req, res, next) {
    StudentService.create(req, res);
});
router.get('/list', function (req, res, next) {
    StudentService.list(req, res);
});
router.put('/update/:id', function (req, res, next) {
    StudentService.update(req, res);
});
router.delete('/delete/:id', function (req, res, next) {
    StudentService.delete(req, res);
});
router.get('/retrieve/:id', function (req, res, next) {
    StudentService.retrieve(req, res);
});

module.exports = router;
