import { NextFunction, Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import JWT from 'jsonwebtoken';
import basicAuthnticationMiddleware from "../middlewares/basic-authentication.middleware";
import wjtAthenticationMiddleware from "../middlewares/jwt-authentication.middleware"


const authorizationRouter = Router()

authorizationRouter.post('/token/validate', wjtAthenticationMiddleware, async (req: Request, res: Response, next:NextFunction) => {
    res.sendStatus(StatusCodes.OK)
    
} )

authorizationRouter.post('/token',basicAuthnticationMiddleware, async (req: Request, res: Response, next: NextFunction)=>{
    
    const user = req.user

    if(!user){
        return res.status(StatusCodes.FORBIDDEN).json({mensagem:'usuario não informado!'})
    }

    const jwtPayload = { username: user.username }
    const jwtOptions = { subject: user?.id }
    const secretKey = 'my_secret_key'

    const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions)

    return res.status(StatusCodes.OK).json({token:jwt})
    
})


export default authorizationRouter