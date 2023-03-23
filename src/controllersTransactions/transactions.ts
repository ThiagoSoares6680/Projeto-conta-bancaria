import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import transactionsRepository from '../repositories/transactions.repository'
import userRepository from '../repositories/user.repository'
import AccountRepository from '../repositories/account.repository'
import Transaction from '../model/transaction.model'
import User from '../model/user.model'

class transactionsDeposit{
    async handle(req: Request<{id: string}>, res: Response, next:NextFunction){
        
        const paramsId = req.params.id
        const valueBody = req.body
        const user1 = await userRepository.findById(paramsId)
        const user2 = await userRepository.findByUsername(valueBody.username)


        if(!user2){
            return res.status(StatusCodes.FORBIDDEN).json({mensagem: `O nome ${valueBody.username} nao tem conta cadastrada`})
        }

        if(user1.id == user2.id){
            return res.status(StatusCodes.FORBIDDEN).json({mensagem:`Não é possivel fazer tranferencia para si mesmo!`})
        }

        if(user1.balance < valueBody.value){
            return res.status(StatusCodes.FORBIDDEN).json({mensagem:`Valor insuficinete para transacao`})
        }
        
        if(valueBody <= 0){
            return res.status(StatusCodes.FORBIDDEN).json({mensagem:'Valor de deposito insuficiente'})
        }

        user1.balance = Number(user1.balance) - Number(valueBody.value)
        user2.balance = Number(user2.balance) + Number(valueBody.value)

        const transaction = {
            debitedAccountid: user1.accountid,
            creditedAccountid: user2.accountid,
            value: valueBody.value,
            createdAt: new Date().toISOString(),
        } as Transaction

        const updateUser1 = {
            id: user1.accountid,
            balance: user1.balance
        }as User

        const updateUser2 = {
            id: user2.accountid,
            balance: user2.balance
        }as User
        
        await Promise.all([
            AccountRepository.update(updateUser1),
            AccountRepository.update(updateUser2),
            transactionsRepository.create(transaction)
        ])

        return res.status(StatusCodes.OK).json(`Deposito com sucesso, Beneficiario: ${user2.username}, Valor de tranferencia: ${ valueBody.value }`)
    }
}

export { transactionsDeposit }