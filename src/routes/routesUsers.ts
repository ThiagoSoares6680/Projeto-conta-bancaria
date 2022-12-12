import { Router, Request, Response, NextFunction } from 'express'
import {StatusCodes} from 'http-status-codes'
import useRepository from '../repositories/repositories'


const routerUsers = Router()

routerUsers.get('/users', async (req:Request, res:Response, next:NextFunction)=>{
    const user = await useRepository.findAllUsers()
    res.status(StatusCodes.OK).json(user)
})


routerUsers.get('/users/:uuid', async (req:Request<{uuid: string}>, res:Response, next:NextFunction)=>{
    const uuid = req.params.uuid
    const user = await useRepository.findById(uuid)
    res.status(StatusCodes.OK).send({ user })
})


routerUsers.post('/users', async (req:Request, res:Response, next:NextFunction)=>{
    const user = req.body
    const uuid = await useRepository.create(user)
    res.status(StatusCodes.CREATED).send({ uuid })
})   


routerUsers.put('/users/:uuid', async (req:Request<{uuid: string}>, res:Response, next:NextFunction)=>{
    const uuid = req.params.uuid
    const modifica = req.body
    modifica.uuid = uuid

    await useRepository.update(modifica)

    res.status(StatusCodes.OK).json('Login alterado')
})

routerUsers.delete('/users/:uuid', async (req:Request<{uuid: string}>, res:Response, next:NextFunction)=>{
    const uuid =  req.params.uuid
    await useRepository.delete(uuid)
    res.status(StatusCodes.OK).json('login excluido')
})

export default routerUsers