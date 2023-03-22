import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import transactionsRepository from '../repositories/transactions.repository'
import userRepository from '../repositories/user.repository'
import AccountRepository from '../repositories/account.repository'
import Transaction from '../model/transection.model'

class transactionsDeposit{
    async handle(req: Request<{id: string}>, res: Response, next:NextFunction){
        
        const paramsId = req.params.id
        const valueBody = req.body
        const user1 = await userRepository.findById(paramsId)
        const user2 = await userRepository.findByUsername(valueBody.username)

        const debitedAccountid = await transactionsRepository.findTransectionsId(user1.accountid)
        const valueAccount1 = debitedAccountid.balance
        
        const creditedAccountid = await transactionsRepository.findTransectionsId(user2.accountid)
        const valueAccount2 = creditedAccountid.balance

        if(!user2){
            return res.status(StatusCodes.FORBIDDEN).json({mensagem: `O nome ${valueBody.username} nao tem conta cadastrada`})
        }

        if(user1.id == user2.id){
            return res.status(StatusCodes.FORBIDDEN).json({mensagem:`Não é possivel fazer tranferencia para si mesmo!`})
        }

        if(valueAccount1 < valueBody.value){
            return res.status(StatusCodes.FORBIDDEN).json({mensagem:`Valor insuficinete para transacao`})
        }
        
        if(valueBody <= 0){
            return res.status(StatusCodes.FORBIDDEN).json({mensagem:'Valor de deposito insuficiente'})
        }

        creditedAccountid.balance = Number(valueAccount2) + Number(valueBody.value)
        debitedAccountid.balance = Number(valueAccount1) - Number(valueBody.value)

        const transaction = {
            debitedAccountid: user1.accountid,
            creditedAccountid: user2.accountid,
            value: valueBody.value,
            createdAt: new Date().toISOString(),
        } as Transaction

        await Promise.all([
            AccountRepository.update(debitedAccountid),
            AccountRepository.update(creditedAccountid),
            transactionsRepository.create(transaction)
        ])

        return res.status(StatusCodes.OK).json(`Deposito com sucesso, Beneficiario: ${creditedAccountid.username}, Valor de tranferencia: ${ valueBody.value }`)
    }
}

export { transactionsDeposit }