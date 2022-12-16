import { Router, Request, Response, NextFunction } from 'express'
import {StatusCodes} from 'http-status-codes'
import { CreateUser } from '../controllers/controllerUsers'
import Users from '../repositories/user.repository'


const routerUsers = Router()

routerUsers.get('/users', async (req:Request, res:Response, next:NextFunction)=>{
    const user = await Users.findAllUsers()
    res.status(StatusCodes.OK).json(user)
})


routerUsers.get('/users/:id', async (req:Request<{id: string}>, res:Response, next:NextFunction)=>{
    const uuid = req.params.id
    const user = await Users.findById(uuid)
    res.status(StatusCodes.OK).send({ user })
})


routerUsers.post('/users', new CreateUser().handle )   


routerUsers.put('/users/:id', async (req:Request<{id: string}>, res:Response, next:NextFunction)=>{
    const uuid = req.params.id
    const modifica = req.body
    modifica.uuid = uuid

    await Users.update(modifica)

    res.status(StatusCodes.OK).json('Login alterado')
})

routerUsers.delete('/users/:id', async (req:Request<{id: string}>, res:Response, next:NextFunction)=>{
    const uuid =  req.params.id
    await Users.delete(uuid)
    res.status(StatusCodes.OK).json('login excluido')
})

export default routerUsers