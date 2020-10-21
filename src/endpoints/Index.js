require('dotenv').config();
const express = require('express');
const app = express();


/*
app.get('/GetTablaNotas', async (req, res) =>{
    try {
        //get connection
        const conn = await pool.getConnection()

        //create a new query
        const query = 'select * from tablaCurso';

        //Execute query
        const rows = await conn.query(query);

        // response to the client
        res.status(200).json(rows);
    } catch (error) {
        console.log(error)
    }
});

app.post('/postTablaCurso', async (req, res) =>{
    console.log(req.body);
    try {
        //get connection
        const conn = await pool.getConnection()

        //create a new query
        const query = "INSERT INTO tablaCurso (cursoId) VALUES (?)";

        //Execute query
        const result = await conn.query(query, [req.body.cursoId]);

        // response to the client
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
    }
})
*/

app.set("port", process.env.PORT || 3000)

app.use(express.json());

app.use(require("./Notas"))

app.listen(app.get("port"), () => {
    console.log('Server on port http://localhost:3000', app.get("port"));
})
