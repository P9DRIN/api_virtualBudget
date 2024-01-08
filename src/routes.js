import express from 'express'
import {  index, indexById, getProjectName, getBudgets, remove, store, updateIntoBudgets, update } from './controllers/ProjectController.js'
import { validateId } from './middlewares/ProjectMiddleware.js'


const routes = express.Router();

routes.get('/project', index)

routes.get('/project/:id', validateId, indexById)

routes.get('/project/:projectName', getProjectName)

routes.get('/project/:projectName/budgets', getBudgets)

routes.post('/project', store)

routes.post('/project/:projectName/budgets', updateIntoBudgets)

routes.put('/project/:id', validateId, update)

routes.delete('/project/:id', validateId, remove)

export default routes