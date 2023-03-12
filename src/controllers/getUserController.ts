import { Request, Response, NextFunction } from 'express'
import userRepository from '../repositories/user.repository'
import { StatusCodes } from 'http-status-codes'
import UserTransactions from '../repositories/transactions.repository'

// Metodo GET user por ID

class getUserController{
    async handle(req:Request<{id: string}>, res:Response, next:NextFunction){
        const id = req.params.id
        const users = await userRepository.findById(id)
        const account = await UserTransactions.findTransectionsId(users.accountid)
        res.status(StatusCodes.OK).json({mensagem: `balance atual: ${account.balance} `,  users})
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