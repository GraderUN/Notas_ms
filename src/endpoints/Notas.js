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

//Devuelve
router.get('/notasMateriaPeriodo/:estudianteId/:notasIdMateria/:notasPeriodo', (req
                                                                                , res) => {
    const notasMateriaPeriodo = req.params;
    console.log(notasMateriaPeriodo)
    mysqlConnection.query("SELECT notasValor,notasPeriodo FROM tablaNotas INNER JOIN tablaCursoXEstudiante on " +
        "notasIdCursoEstudiante=cursoXEstudianteId INNER JOIN tablaEstudiante on " +
        "cursoXEstudianteIdEstudiante=estudianteId  WHERE estudianteId= ? AND  notasIdMateria= ? AND " +
        "notasPeriodo= ?;", [notasMateriaPeriodo.estudianteId, notasMateriaPeriodo.notasIdMateria,
            notasMateriaPeriodo.notasPeriodo ], (err, rows, fields) => {
        if (!err) {
            console.log(rows)
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

router.get('/notasPeriodosAnteriores/:estudianteId/:notasIdMateria', (req,
                                                                      res) => {
    const notasMateriaPeriodo = req.params;
    console.log(notasMateriaPeriodo)
    mysqlConnection.query("SELECT notasValor,notasPeriodo FROM tablaNotas INNER JOIN tablaCursoXEstudiante on " +
        "notasIdCursoEstudiante=cursoXEstudianteId INNER JOIN tablaEstudiante on " +
        "cursoXEstudianteIdEstudiante=estudianteId  WHERE estudianteId= ? AND  notasIdMateria= ?;",
        [notasMateriaPeriodo.estudianteId, notasMateriaPeriodo.notasIdMateria],
        (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

router.get('/promedioMateriaPeriodo/:estudianteId/:notasIdMateria/:notasPeriodo', (req
    , res) => {
    const notasMateriaPeriodo = req.params;
    mysqlConnection.query("SELECT notasValor,notasPorcentaje FROM tablaNotas INNER JOIN tablaCursoXEstudiante on " +
        "notasIdCursoEstudiante=cursoXEstudianteId INNER JOIN tablaEstudiante on " +
        "cursoXEstudianteIdEstudiante=estudianteId  WHERE estudianteId= ? AND  notasIdMateria= ? AND " +
        "notasPeriodo= ?;", [notasMateriaPeriodo.estudianteId, notasMateriaPeriodo.notasIdMateria,
        notasMateriaPeriodo.notasPeriodo], (err, rows, fields) => {
        if (!err) {
            res.json(logicaNotas.promedioEstudiantePeriodoMateria(rows));
        } else {
            console.log(err);
        }
    })
})

//Devuelve el promedio del estudiante dando el periodo, la materia y el ID
router.get('/promedioEstudianteMateriaPeriodo/:estudianteId/:notasIdMateria/:notasPeriodo', (req
    , res) => {
    const notas = req.params;
    logicaNotas.promedioEstudiantePeriodoMateria(req.params.estudianteId, req.params.notasPeriodo,
        req.params.notasIdMateria).then(response => {
        res.json(response);
    }).catch("NADA QUE LLEGA");
})

//Devuelve el promedio del estudiante en un periodo específico en una materia
router.get('/promedioEstudianteMateria/:estudianteId/:notasIdMateria', (req
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
    logicaNotas.estadisticasCurso(req.params.cursoId).then(response => {
        res.json(response);
    }).catch("NADA QUE LLEGA");
})

module.exports = router;