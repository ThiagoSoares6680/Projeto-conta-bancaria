import { Router, Request, Response, NextFunction } from 'express'
import {StatusCodes} from 'http-status-codes'
import userRepository from '../repositories/repositories'

class CreateUser{
    async handle(req: Request, res: Response, next:NextFunction){

        const user  = req.body
        const username =  req.body.username
    
        // Verifica se o username contem mais de 3 caracteres 
        if(username.length < 3 ){
            return res.status(StatusCodes.BAD_REQUEST).json({mensagem:`O nome deve conter pelo menos 3 caracteres`})
        }
        
        // Verifica se nome de usuario já exite
        const userExists = await userRepository.findByUsername(username)

        if(userExists){
            return res.status(StatusCodes.BAD_REQUEST).json({mensagem:`Nome do usuario ja existe`})
        }

        const uuid = await userRepository.create(user)
        return res.status(StatusCodes.CREATED).json(user)
    }
       
}    
   

export { CreateUser }