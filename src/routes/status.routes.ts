import { Router, Request, Response, NextFunction } from 'express'
import {StatusCodes} from 'http-status-codes'


const statusRoutes = Router()

statusRoutes.get('/status', (req: Request, res:Response, next:NextFunction) => {
    res.status(StatusCodes.OK).send({ Status: 'Servidor operando normalmente!!'})
})

export default statusRoutes