import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import UserTransactions from '../repositories/transactions.repository'


class transactionsTransfer{
    async handle(req: Request<{id: string}>, res: Response, next:NextFunction){

        const valueBody = req.body.value
        const valueId = req.body.id
        const id = req.params.id
        const account2 = await UserTransactions.findTransectionsId(valueId)
        let valueAccount2 = account2.balance
        const account = await UserTransactions.findTransectionsId(id)
        let valueAccount = account.balance

        if(Number(valueBody) > Number(valueAccount)){
            return res.status(StatusCodes.FORBIDDEN).json({mensagem:`Saldo insuficiente para transacao Saldo: ${valueAccount}`})
        }

        account.balance = Number(valueAccount) - Number(valueBody)
        account.id = id
        const total = await UserTransactions.update(account)
        
        account2.balance = Number(valueAccount2) + Number(valueBody)
        account2.id = valueId
        const total2 = await UserTransactions.update(account2)

        return res.status(StatusCodes.OK).json({mensagem:`Transferencia concluida com sucesso saldo: ${valueAccount}`})
    }
}

export { transactionsTransfer }