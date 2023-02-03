import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import  UsersRepository  from "../repositories/user.repository"

async function basicAuthnticationMiddleware(req: Request, res: Response, next:NextFunction) {

    const authorizationHeader = req.headers['authorization']

    if(!authorizationHeader){
        return res.status(StatusCodes.FORBIDDEN).json({mensagem:'credenciais não informadas'})
    }
    const [authenticationType, token] = authorizationHeader.split(' ');

    if(authenticationType !== 'Basic' || !token){
        return res.status(StatusCodes.FORBIDDEN).json({mensagem:'Tipo de autenticação invalida!'})
    }

    const tokenContent = Buffer.from(token, 'base64').toString('utf-8')

    const [password, username] = tokenContent.split(':')

    if(!password || !username){
        return res.status(StatusCodes.FORBIDDEN).json({mensagem:'Credenciais não preenchidas!'})
    }

    const user = await UsersRepository.findUserNamePassword(password, username)


    if(!user){
        return res.status(StatusCodes.FORBIDDEN).json({mensagem:'Senha ou usuario invalido'})
    }

    
    req.user = user;
    next()
}
export default basicAuthnticationMiddleware;