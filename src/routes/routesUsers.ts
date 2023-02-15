import { Router } from 'express'
import { getUserController } from '../controllers/getUserController'
import { createUsersController } from '../controllers/createUsersController'
import { deleteUserController } from '../controllers/deleteUserController'
import { updateUserController } from '../controllers/updateUserController'
import { getUsersController } from '../controllers/getUserController'
import wjtAthenticationMiddleware from "../middlewares/jwt-authentication.middleware"




const routerUsers = Router()

// instancia das rotas
const GetUserController = new getUserController()
const GetUsersController = new getUsersController()
const CreateUsersController = new createUsersController()
const DeleteUserController = new deleteUserController()
const UpdateUserController = new updateUserController()

// Rotas
routerUsers.get('/users', wjtAthenticationMiddleware, GetUsersController.handle)
routerUsers.get('/users/:id', wjtAthenticationMiddleware, GetUserController.handle)
routerUsers.post('/users', CreateUsersController.handle)    
routerUsers.put('/users/:id', UpdateUserController.handle)
routerUsers.delete('/users/:id', DeleteUserController.handle)

export default routerUsers