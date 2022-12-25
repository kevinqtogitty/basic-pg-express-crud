import express, { Request, Response } from 'express';
import { pool } from './db';

const app = express();
app.use(express.json()); // allows us to access request body

// ROUTES

// GET all todos
app.get('/todos', async (req: Request, res: Response) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo;');
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error);
  }
});

// GET a single todo
app.get('/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const singleTodo = await pool.query('SELECT * FROM todo WHERE id = ($1);', [
      id
    ]);
    res.json(singleTodo.rows);
  } catch (error) {
    console.log(error);
  }
});

// CREATE a todo
app.post('/todos', async (req: Request, res: Response) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES ($1) RETURNING *',
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

// UPDATE a todo
app.put('/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedTodo = await pool.query(
      'UPDATE todo SET description = ($1) WHERE id = ($2)',
      [description, id]
    );

    res.json('Updated!');
  } catch (error) {
    console.log(error);
  }
});

// DELETE a todo
app.delete('/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTodo = await pool.query('DELETE FROM todo WHERE id = ($1)', [
      id
    ]);

    res.json('Todo was succesfully deleted!!');
  } catch (error) {
    console.log(error);
  }
});

app.get('/', (req: Request, res: Response): void => {
  res.json({ message: 'Please Like the Video!' });
});

app.listen('3001', (): void => {
  console.log('Server Running!');
});
