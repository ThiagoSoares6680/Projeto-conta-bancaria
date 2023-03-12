import { Router } from 'express'
import Cors from 'cors'
import { getUserController } from '../controllers/getUserController'
import { createUsersController } from '../controllers/createUsersController'
import { deleteUserController } from '../controllers/deleteUserController'
import { updateUserController } from '../controllers/updateUserController'
import { getUsersController } from '../controllers/getUserController'
import wjtAthenticationMiddleware from "../middlewares/jwt-authentication.middleware"
import { transactionsDeposit } from "../transactions/transactionsDeposit"
import { transactionsWithdraw } from "../transactions/transactionsWithdraw"

const routerUsers = Router()
routerUsers.use(Cors({
   
}))

// instancia das rotas
const GetUserController = new getUserController()
const GetUsersController = new getUsersController()
const CreateUsersController = new createUsersController()
const DeleteUserController = new deleteUserController()
const UpdateUserController = new updateUserController()
const TransactionsDeposit = new transactionsDeposit()
const TransactionsWithdraw = new transactionsWithdraw()


// Rotas
routerUsers.get('/users', wjtAthenticationMiddleware, GetUsersController.handle)
routerUsers.get('/users/:id', wjtAthenticationMiddleware, GetUserController.handle)
routerUsers.post('/users',  CreateUsersController.handle)    
routerUsers.put('/users/:id', wjtAthenticationMiddleware, UpdateUserController.handle)
routerUsers.delete('/users/:id', wjtAthenticationMiddleware, DeleteUserController.handle)

// Rotas de transacoes

routerUsers.post('/users/transactions/:id',TransactionsDeposit.handle)
routerUsers.post('/users/transactions/swithdraw/:id',TransactionsWithdraw.handle)

export default routerUsers