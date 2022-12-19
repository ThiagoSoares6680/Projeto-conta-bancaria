import { Router, Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import  UsersRepository  from '../repositories/user.repository'


class updateUserController{
    async handle(req:Request<{id: string}>, res:Response, next:NextFunction){
        
        const id = req.params.id
        const alterar = req.body
        const username = req.body.username
        const password = req.body.password
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,15}$/
        
        if(regex.test(password)){

            if(username.length <= 3){
                res.status(StatusCodes.BAD_REQUEST).json({mensagem:`Login precisa ter pelo menos 3 caracteres`})
            }else{
                alterar.id = id
                await UsersRepository.update(alterar)
                res.status(StatusCodes.OK).json({mensagem:`Login altarado`})
            }
        }else{
            return res.status(StatusCodes.BAD_REQUEST).json({mensagem:`Senha não contem os requisitos minimos de segurança`})
        }
        
    }
}

export {updateUserController} 