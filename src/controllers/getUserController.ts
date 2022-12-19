import { Request, Response, NextFunction } from 'express'
import userRepository from '../repositories/user.repository'
import { StatusCodes } from 'http-status-codes'


// Metodo GET user por ID

class getUserController{
    async handle(req:Request<{id: string}>, res:Response, next:NextFunction){
        const id = req.params.id
        const user = await userRepository.findById(id)
        res.status(StatusCodes.OK).json(user)
    }
}

// Metodo GET todos users

class getUsersController{
    async handle(req:Request, res:Response, next:NextFunction){
        const users = await userRepository.findAllUsers()
        res.status(StatusCodes.OK).json(users)
    }
}

export {getUserController, getUsersController}