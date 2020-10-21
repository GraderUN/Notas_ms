const express = require('express');
const mysqlConnection = require("../DBConnection/database");


//Funcion obtener notas de un estudiante en una clase y un periodo
async function notasEstudianteClasePeriodo(estudianteId, claseId, periodo) {
    return new Promise((resolve => {
        mysqlConnection.query("SELECT * FROM tablaNotas INNER JOIN tablaTipoNotas on tipoNotasId=tipoNotasIdClase" +
            " WHERE notasIdEstudiante= ? AND  tipoNotasIdClase= ? AND notasPeriodo= ?;", [estudianteId, claseId,
            periodo], (err, rows, fields) => {
            let notas;
            if (!err) {
                notas = JSON.parse(JSON.stringify(rows));
                resolve(notas);
            } else {
                console.log(err);
            }
        })
    }))
}

//Funcion obtener notas de un estudiante en una clase en todos los periodos
async function notasEstudianteClase(estudianteId, claseId) {
    return new Promise((resolve => {
        let arr = [];
        for (let i = 1; i <= 5; i++) {
            arr.push(notasEstudianteClasePeriodo(estudianteId, claseId, i));
            console.log("entra")
        }
        Promise.all(arr).then(messages => {
                resolve(messages);
            }
        )
    }))
}


//Funcion para calcular el promedio de un estudiante teniendo ID, periodo y materia, devuelve promedio materia periodo
async function promedioEstudianteMateriaPeriodo(estudianteId, claseId, periodo) {
    return new Promise((resolve => {
        mysqlConnection.query("SELECT * FROM tablaNotas INNER JOIN tablaTipoNotas on notastipoNotasId=tipoNotasId" +
            " WHERE notasIdEstudiante= ? AND  tipoNotasId= ? AND notasPeriodo= ?;", [estudianteId, claseId,
            periodo], (err, rows, fields) => {
            let notas;
            if (!err) {
                notas = JSON.parse(JSON.stringify(rows));
                let sum = 0;
                for (let i = 0; i < notas.length; i++) {
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
async function promedioEstudianteMateria(estudianteId, claseId) {
    return new Promise((resolve => {
        let suma = 0;
        let arr = [];
        for (let i = 1; i < 5; i++) {
            arr.push(promedioEstudianteMateriaPeriodo(estudianteId, claseId, i));
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


function Promedio(notas) {
    let periodo = [1, 2, 3, 4], array = [];
    for (i = 0; i < periodo.length; i++) {
        notas.notasPeriodo[periodo[i]]
    }
}

module.exports = {
    promedioEstudiantePeriodoMateria: promedioEstudianteMateriaPeriodo, promedioEstudianteMateria,
    promedioEstudiante, promedioCurso, estadisticasCurso, notasEstudianteClasePeriodo, notasEstudianteClase
}
