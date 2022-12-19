import { Router, Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import  UsersRepository  from '../repositories/user.repository'


class updateUserController{
    async handle(req:Request<{id: string}>, res:Response, next:NextFunction){
        
        const id = req.params.id
        const alterar = req.body
        const username = req.body.username

        if(username.length <= 3){
            res.status(StatusCodes.BAD_REQUEST).json({mensagem:`Login precisa ter pelo menos 3 caracteres`})
        }else{
            alterar.id = id
            await UsersRepository.update(alterar)
            res.status(StatusCodes.OK).json({mensagem:`Login altarado`})
        }
    }
}

export {updateUserController} 