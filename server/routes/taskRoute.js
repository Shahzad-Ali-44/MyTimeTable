import express from 'express';
import { fetchTasks, addTask, deleteTask, editTask } from "../controller/taskController.js";
import { authenticateUser } from '../middleware/authMiddleware.js';

const route = express.Router();

route.use(authenticateUser);

route.get('/', fetchTasks);
route.post('/', addTask);
route.delete('/:id', deleteTask);
route.put('/:id', editTask);

export default route;  
