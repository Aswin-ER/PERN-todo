const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());


//create a todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING * ",
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error);
    }
});


//View all the todos
app.get('/viewtodos', async (req, res) => {
    try {
        const viewtodos = await pool.query('SELECT * FROM todo');
        res.json(viewtodos.rows);
    } catch (error) {
        console.log(error);
    }
});


//Get specific todo
app.get('/gettodos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const gettodos = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);

        res.json(gettodos.rows);
    } catch (error) {
        console.log(error);
    }
})

//update a specific todo
app.put('/updatetodos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updatetodos = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *', [description, id]);

        res.json(updatetodos.rows);
    } catch (error) {
        console.log(error);
    }
})

//Delete a specific todo
app.delete('/deletetodos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletetodos = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
        console.log(deletetodos, "deletetodos");
        res.json("Deleted todo");
    } catch (error) {
        console.log(error);
    }
})

app.listen(5000, () => {
    console.log("server listening on port 5000");
}); 