const express = require('express');
const router = express.Router();
const mysqlConnection = require("../DBConnection/database");

//Funcion para calcular el promedio de un estudiante teniendo ID, periodo y materia, devuelve promedio materia periodo
async function promedioEstudianteMateriaPeriodo(estudianteId, periodo, IdMateria) {
    return new Promise((resolve => {
        mysqlConnection.query("SELECT notasValor,notasPorcentaje FROM tablaNotas INNER JOIN " +
            "tablaCursoXEstudiante on notasIdCursoEstudiante=cursoXEstudianteId INNER JOIN tablaEstudiante on " +
            "cursoXEstudianteIdEstudiante=estudianteId  WHERE estudianteId= ? AND  notasIdMateria= ? AND " +
            "notasPeriodo= ?;", [estudianteId, IdMateria,
            periodo], (err, rows, fields) => {
            if (!err) {
                notas = JSON.parse(JSON.stringify(rows));
                let sum = 0;
                for (i = 0; i < notas.length; i++) {
                    sum = sum + notas[i].notasValor * (notas[i].notasPorcentaje / 100);
                }
                resolve(sum);
            } else {
                console.log(err);
            }
        })
    }))
}

//Funcion para calcular el promedio en un periodo de un estudiante teniendo ID y materia, devuelve promedio materia
async function promedioEstudianteMateria(estudianteId, idMateria) {
    return new Promise((resolve => {
        let suma = 0;
        let arr = [];
        for (let i = 1; i < 5; i++) {
            arr.push(promedioEstudianteMateriaPeriodo(estudianteId, i, idMateria));
        }
        Promise.all(arr).then(messages => {
            for(let j = 0; j < messages.length; j ++){
                suma = suma + messages[j];
            }
            resolve(suma/4);
            }
        )
    }))
}

//Funcion para calcular el promedio global de un estudiante teniendo ID, devuelve devuelve promedio estudiante
async function promedioEstudiante(estudianteId) {
    return new Promise((resolve => {
        let suma = 0;
        let arr = [];
        let materias = [1,2,3]
        for (let i = 0; i < materias.length; i++) {
            arr.push(promedioEstudianteMateria(estudianteId, materias[i]));
        }
        Promise.all(arr).then(messages => {
            for(let j = 0; j < messages.length; j ++){
                suma = suma + messages[j];
            }
            resolve(suma/materias.length);
        })
    }))
}

//Funcion para calcular el promedio de un curso teniendo ID, devuelve promedio del curso
async function promedioCurso(cursoId) {
    return new Promise((resolve => {
        let suma = 0;
        let arr = [];
        let estudiantes = [11111111,1074187055,1074187189,1074187999]
        for (let i = 0; i < estudiantes.length; i++) {
            arr.push(promedioEstudiante(estudiantes[i]));
        }
        Promise.all(arr).then(messages => {
            for(let j = 0; j < messages.length; j ++){
                suma = suma + messages[j];
            }
            resolve(suma/estudiantes.length);
        })
    }))
}

//Funcion para calcular el promedio de un curso teniendo ID, devuelve promedio del curso
async function estadisticasCurso(listaEst) {
    return new Promise((resolve => {
        let suma = 0;
        let arr = [];
        let estadisticas = [];
        let estudiantes = listaEst.id_students;
        console.log(estudiantes);
        for (let i = 0; i < estudiantes.length; i++) {
            arr.push(promedioEstudiante(estudiantes[i]));
        }
        Promise.all(arr).then(messages => {
            messages.sort();
            estadisticas[0] = {"UltimoPuesto": messages[0], "PrimerPuesto": messages[messages.length - 1]};
            resolve(estadisticas[0]);
        })
    }))
}


//function PromedioEstudianteMateria(req,res) {11
//    let suma = 0;
//    let average = [];
//    const notasMateriaPeriodo = req.params;
//    mysqlConnection.query("SELECT notasValor,notasPorcentaje, notasPeriodo FROM tablaNotas INNER JOIN tablaCursoXEstudiante on " +
//        "notasIdCursoEstudiante=cursoXEstudianteId INNER JOIN tablaEstudiante on " +
//        "cursoXEstudianteIdEstudiante=estudianteId  WHERE estudianteId= ? AND  notasIdMateria= ?",
//        [notasMateriaPeriodo.estudianteId, notasMateriaPeriodo.notasIdMateria, periodo], (err, rows, fields) => {
//        if (!err) {
//            notas = JSON.parse(JSON.stringify(rows));
//            let sum = 0;
//            let average = [-1];
//            for (i = 1; i < 5; i++) {
//                for (j = 0; j < notas.length; j++) {
//                    sum = sum + notas[i].notasValor * (notas[i].notasPorcentaje / 100);
//                }
//            }
//            average[0] = {"promedio": sum};
//            console.log(average)
//            return average;
//        } else {
//            console.log(err);
//        }
//    })
//
//    for (i = 1; i < 5; i++) {
//
//        suma = suma + PromedioEstudiantePeriodoMateria(req,res,i)
//    }
//    suma = suma/4;
//    average[0] = {"promedio": suma};
//    res.json(average);
//}
//Promedio de un estudiante en un periodo con materia
function Promedio(notas) {
    let periodo = [1, 2, 3, 4], array = [];
    for (i = 0; i < periodo.length; i++) {
        notas.notasPeriodo[periodo[i]]
    }
}

module.exports = {
    promedioEstudiantePeriodoMateria: promedioEstudianteMateriaPeriodo, promedioEstudianteMateria, promedioEstudiante,
    promedioCurso, estadisticasCurso
}
