const express = require('express');
const router = express.Router();

const mysqlConnection = require("../DBConnection/database");
const logicaNotas = require("../BusinessLogic/LogicaNotas");

//Devuelve toda la tabla de notas
router.get("/", (req, res) => {
    mysqlConnection.query("select * from tablaNotas", (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

//Devuelve el notas del estudiante dando el estudianteId, el cursoId y el periodo
router.get('/notasEstudianteClasePeriodo/:estudianteId/:claseId/:periodo', (req
    , res) => {
    logicaNotas.notasEstudianteClasePeriodo(req.params.estudianteId, req.params.claseId, req.params.periodo,)
        .then(response => {
            res.json(response);
        }).catch("NADA QUE LLEGA");
})

//Devuelve el notas del estudiante dando el estudianteId y el cursoId
router.get('/notasEstudianteClase/:estudianteId/:claseId', (req
    , res) => {
    logicaNotas.notasEstudianteClase(req.params.estudianteId, req.params.claseId,)
        .then(response => {
            res.json(response);
        }).catch("NADA QUE LLEGA");
})

//Devuelve el promedio del estudiante dando el periodo, la materia y el ID
router.get('/promedioEstudianteMateriaPeriodo/:estudianteId/:claseId/:periodo', (req
    , res) => {
    const notas = req.params;
    logicaNotas.promedioEstudiantePeriodoMateria(req.params.estudianteId, req.params.notasIdMateria,
        req.params.periodo,).then(response => {
        res.json(response);
    }).catch("NADA QUE LLEGA");
})

//Devuelve el promedio del estudiante en un periodo específico en una materia
router.get('/promedioEstudianteMateria/:estudianteId/:claseId', (req
    , res) => {
    logicaNotas.promedioEstudianteMateria(req.params.estudianteId, req.params.notasIdMateria).then(response => {
        res.json(response);
    }).catch("NADA QUE LLEGA");
})

//Devuelve el promedio del estudiante
router.get('/promedioEstudiante/:estudianteId', (req
    , res) => {
    const notas = req.params;
    logicaNotas.promedioEstudiante(req.params.estudianteId).then(response => {
        res.json(response);
    }).catch("NADA QUE LLEGA");
})

router.get('/promedioCurso/:cursoId', (req
    , res) => {
    const notas = req.params;
    logicaNotas.promedioCurso(req.params.cursoId).then(response => {
        res.json(response);
    }).catch("NADA QUE LLEGA");
})

router.get('/estadisticasCurso/:cursoId', (req
    , res) => {
    const notas = req.params;
    const listaEst = req.body;
    logicaNotas.estadisticasCurso(listaEst).then(response => {
        res.json(response);
    }).catch("NADA QUE LLEGA");
})

module.exports = router;
