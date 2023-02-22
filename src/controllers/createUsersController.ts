import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import  UsersRepository from '../repositories/user.repository'
import AccountRepository from '../repositories/account.repository'



class createUsersController{
    async handle(req: Request, res: Response, next:NextFunction){
        
        const user  = req.body
        const username =  req.body.username
        const password =  req.body.password
    
        // Verifica se o username contem mais de 3 caracteres 
        if(username.length <= 3){
            return res.status(StatusCodes.BAD_REQUEST).json({mensagem:`O nome deve conter pelo menos 4 caracteres`})
        }
        
        // Verifica se nome de usuario já exite
        const userExists = await UsersRepository.findByUsername(username)

        if(userExists){
            return res.status(StatusCodes.BAD_REQUEST).json({mensagem:`Nome do usuario ja existe`})
        }

        // Regex de verificacao
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[$*&@#])(?=.*[a-z]).{8,15}$/

        if(regex.test(password)){
            const accountid = await AccountRepository.create({balance: 100})
            const newUser = await UsersRepository.create({ accountid, ...user })
            return res.status(StatusCodes.CREATED).json(newUser)
        }else{
            return res.status(StatusCodes.BAD_REQUEST).json({mensagem:`Senha não contem os requisitos minimos de segurança`})
        }   
    }    
}    
   

export { createUsersController }