import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import UserTransactions from '../repositories/transactions.repository'

class transactionsWithdraw{
    async handle(req: Request<{id: string}>, res: Response, next:NextFunction){

        const valueBody = req.body.value
        const id = req.params.id
        const account = await UserTransactions.findTransectionsId(id)
        let value = account.balance

        if(account.balance < valueBody){
            return res.status(StatusCodes.FORBIDDEN).json({mensagem:`Saldo insufiente`})
        }


    }
}

export { transactionsWithdraw }