import { Router, Request, Response, NextFunction } from 'express'
import {StatusCodes} from 'http-status-codes'
import useRepository from '../repositories/repositories'

class CreateUser{
    async handle(req: Request, res: Response, next:NextFunction){

        const user  = req.body
        const name =  req.body.username

        // Verifica se o username contem mais de 3 caracteres 
        if(name.length < 3){
            return res.status(StatusCodes.BAD_REQUEST).json({mensagem:`O nome deve conter pelo menos 3 caracteres`})
        }

        const uuid = await useRepository.create(user)
        return res.status(201).json(user)
    }
       
}    
   

export { CreateUser }