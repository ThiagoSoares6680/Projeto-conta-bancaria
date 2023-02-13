import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import  JWT  from "jsonwebtoken";


async function wjtAthenticationMiddleware(req:Request, res:Response, next:NextFunction){

    const authorizationHeader = req.headers['authorization']

    if(!authorizationHeader){
        return res.status(StatusCodes.FORBIDDEN).json({mensagem:'Credenciais não informadas'})
    }

    const [authenticationType, token] = authorizationHeader.split(' ')

    if(authenticationType !== 'Bearer' || !token){
        return res.status(StatusCodes.FORBIDDEN).json({mensagem:'Tipo de autenticação invalida!'})
    }

    try{
        const tokenPayload = JWT.verify(token,'my_secret_key')

    if (typeof tokenPayload !== 'object' || !tokenPayload.sub){
        return res.status(StatusCodes.FORBIDDEN).json('token invalido')
    }

    const user = {
        id: tokenPayload.sub,
        username: tokenPayload.username,
        password: tokenPayload.password,
        accountid: tokenPayload.accountid
    }

    req.user = user
    next();
    }catch (error){
        return res.status(StatusCodes.FORBIDDEN).json({mensagem:'Token invalido'})
    }
    
}

export default wjtAthenticationMiddleware