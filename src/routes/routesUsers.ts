import { Router, Request, Response, NextFunction } from 'express'
import {StatusCodes} from 'http-status-codes'
import { createUsersController } from '../controllers/createUsersController'
import { deleteUserController } from '../controllers/deleteUserController'
import { updateUserController } from '../controllers/updateUserController'
import Users from '../repositories/user.repository'


const routerUsers = Router()


const CreateUsersController = new createUsersController()
const DeleteUserController = new deleteUserController()
const UpdateUserController = new updateUserController()

routerUsers.get('/users', async (req:Request, res:Response, next:NextFunction)=>{
    const user = await Users.findAllUsers()
    res.status(StatusCodes.OK).json(user)
})


routerUsers.get('/users/:id', async (req:Request<{id: string}>, res:Response, next:NextFunction)=>{
    const uuid = req.params.id
    const user = await Users.findById(uuid)
    res.status(StatusCodes.OK).send({ user })
})


routerUsers.post('/users', CreateUsersController.handle )   
routerUsers.put('/users/:id', UpdateUserController.handle )
routerUsers.delete('/users/:id', DeleteUserController.handle )

export default routerUsers