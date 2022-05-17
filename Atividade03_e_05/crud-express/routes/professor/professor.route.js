var ProfessorService = require('../../services/professor/professor.service');
var express = require('express');
var router = express.Router();

router.post('/create', function (req, res, next) {
    ProfessorService.create(req, res);
});
router.get('/list', function (req, res, next) {
    ProfessorService.list(req, res);
});
router.put('/update/:id', function (req, res, next) {
    ProfessorService.update(req, res);
});
router.delete('/delete/:id', function (req, res, next) {
    ProfessorService.delete(req, res);
});
router.get('/retrieve/:id', function (req, res, next) {
    ProfessorService.retrieve(req, res);
});

module.exports = router;