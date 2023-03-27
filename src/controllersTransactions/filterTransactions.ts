import { Request, Response, NextFunction } from 'express'
import transactionsRepository from '../repositories/transactions.repository'
import { StatusCodes } from "http-status-codes";

class filterTransactions{
    async handle(req: Request<{id: string}>, res: Response, next:NextFunction){

        const id = req.body.id
        let cash = req.body.cash
        const cashOut = await transactionsRepository.findCashIn(id)
        const cashIn = await transactionsRepository.findCashOut(id)
        const total = {cashIn, cashOut}

        if(cash == "all"){
            return res.status(StatusCodes.OK).json(total)
        }
        if(cash == "cashOut"){
           return res.status(StatusCodes.OK).json(cashOut)
        }
        if(cash == "cashIn"){
            return res.status(StatusCodes.OK).json(cashIn)
        }
    }   
}

export { filterTransactions }

