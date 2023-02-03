import { NextFunction, Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import JWT from 'jsonwebtoken';
import basicAuthnticationMiddleware from "../middlewares/basic-authentication.middleware";



const authorizationRouter = Router()


authorizationRouter.post('/token',basicAuthnticationMiddleware, async (req: Request, res: Response, next: NextFunction)=>{
    
    const user = req.user

    if(!user){
        return res.status(StatusCodes.FORBIDDEN).json({mensagem:'usuario não informado!'})
    }

    const jwtPayload = { username: user.username }
    const jwtOptions = { subject: user?.id }
    const secretKey = 'my_secret_key'

    const wjt = JWT.sign(jwtPayload, secretKey, jwtOptions)

    return res.status(StatusCodes.OK).json(wjt)
    
})


export default authorizationRouter