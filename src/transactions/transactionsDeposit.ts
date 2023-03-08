import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import UserTransactions from '../repositories/transactions.repository'

class transactionsDeposit{
    async handle(req: Request<{id: string}>, res: Response, next:NextFunction){
        
        const valueBody = req.body.value
        const id = req.params.id
        const account = await UserTransactions.findTransectionsId(id)
        let value = account.balance
        
        
        if(valueBody <= 0){
            return res.status(StatusCodes.FORBIDDEN).json({mensagem:'Valor de deposito insuficiente'})
        }

        account.balance = Number(value) + Number(valueBody)

        account.id = id
        const total = await UserTransactions.update(account)
        res.status(StatusCodes.OK).json(`Deposito com sucesso, Saldo: ${account.balance}`)
    }
}

export {transactionsDeposit}