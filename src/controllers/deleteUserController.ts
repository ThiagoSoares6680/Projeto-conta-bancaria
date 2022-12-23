import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import account from '../repositories/account.repository'
import userRepository from '../repositories/user.repository'
import Users from '../repositories/user.repository'

class deleteUserController{
    async handle(req:Request<{id: string}>, res:Response, next:NextFunction){
        const id = req.params.id
        const user = await userRepository.findById(id)
        const accountId = user.accountid
        await Users.delete(id)
        await account.deleteAccount(accountId)
        res.status(StatusCodes.OK).json({mensagem:`Login Excluido!`})
    }
}

export {deleteUserController}