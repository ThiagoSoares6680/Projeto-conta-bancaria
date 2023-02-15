import {  Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import userRepository from '../repositories/user.repository'
import  UsersRepository  from '../repositories/user.repository'


class updateUserController{
    async handle(req:Request<{id: string}>, res:Response, next:NextFunction){
        
        const id = req.params.id
        const alterar = req.body
        const username = req.body.username
        const password = req.body.password
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[$*&@#])(?=.*[a-z]).{8,15}$/
        

        const userExists = await userRepository.findByUsername(username)

        try{
            if(userExists && userExists.id != id ){
                return res.status(StatusCodes.BAD_REQUEST).json({mensagem: `Nome do usuario já existe.`})
            }
    
            if(!regex.test(password)){
                return res.status(StatusCodes.FORBIDDEN).json({mensagem:`Senha não contem os requisitos minimos de segurança`}) 
            }
            
            if(username.length <= 3){
                return res.status(StatusCodes.FORBIDDEN).json({mensagem:`Login precisa ter pelo menos 3 caracteres`})
            }
    
    
            alterar.id = id
            await UsersRepository.update(alterar)
            res.status(StatusCodes.OK).json({mensagem:`Login altarado`})
            
        }catch(error){
            return res.status(StatusCodes.FORBIDDEN).json({mensagem:' Id inválido '})
        }
        
    }
}

export {updateUserController}