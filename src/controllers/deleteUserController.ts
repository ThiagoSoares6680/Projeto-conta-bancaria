import { Router, Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import Users from '../repositories/user.repository'

class deleteUserController{
    async handle(req:Request<{id: string}>, res:Response, next:NextFunction){
        const id = req.params.id
        await Users.delete(id)
        res.status(StatusCodes.OK).json({mensagem:`Login Excluido!`})
    }
}

export {deleteUserController}