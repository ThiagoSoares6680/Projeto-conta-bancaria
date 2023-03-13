import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import userTransactions from '../repositories/transactions.repository'
import userRepository from '../repositories/user.repository'

class transactionsDeposit{
    async handle(req: Request<{id: string}>, res: Response, next:NextFunction){
        
        const paramsId = req.params.id
        const valueBody = req.body
        const user1 = await userRepository.findById(paramsId)
        const user2 = await userRepository.findByUsername(valueBody.username)
        const account1 = await userTransactions.findTransectionsId(user1.accountid)
        const valueAccount1 = account1.balance
        const account2 = await userTransactions.findTransectionsId(user2.accountid)
        const valueAccount2 = account2.balance

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

        account2.balance = Number(valueAccount2) + Number(valueBody.value)
        account1.balance = Number(valueAccount1) - Number(valueBody.value)

        account1.id = user1.accountid
        const total1 = await userTransactions.update(account1)

        account2.id = user2.accountid
        const total2 = await userTransactions.update(account2)
        return res.status(StatusCodes.OK).json(`Deposito com sucesso, Beneficiario: ${account2.username}, Valor de tranferencia: ${ valueBody.value }`)     
    }
}

export { transactionsDeposit }