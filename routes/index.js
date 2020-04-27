import express from 'express';
import TodoController from '../controllers/todos';


const router = express.Router(); //router handler

//all routes belong to this file.
//get all todos
router.get('/api/v1/todos',TodoController.getAllToDos);
//post a todo
router.post('/api/v1/todos/',TodoController.createToDo);
//get a single todo
router.get('/api/v1/todos/:id',TodoController.getToDo); 
//delete a todo.
router.delete('/api/v1/todos/:id',TodoController.deleteToDo);
//updating a todo
router.put('/api/v1/todos/:id',TodoController.UpdateToDo);


export default router;