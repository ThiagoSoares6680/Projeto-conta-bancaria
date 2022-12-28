import { NextFunction, Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import  UsersRepository  from "../repositories/user.repository"


const authorizationRouter = Router()


authorizationRouter.post('/token', async (req: Request, res: Response, next: NextFunction)=>{

    try{
        const authorizationHeader = req.headers['authorization'];

        if(!authorizationHeader){
            return res.status(StatusCodes.FORBIDDEN).json({mensagem:'Credenciais não informadas!'})
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if(authenticationType !== 'Basic' || !token){
            return res.status(StatusCodes.FORBIDDEN).json({mensagem:'Tipo de autenticação invalida!'})
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8')

        const [username, password] = tokenContent.split(':')

        if(!password || !username){
            return res.status(StatusCodes.FORBIDDEN).json({mensagem:'Credenciais não preenchidas!'})
        }

        const user = await UsersRepository.findUserNamePassword(username, password)

        if(!user){
            return res.status(StatusCodes.FORBIDDEN).json({mensagem:'Senha ou usuario invalido'})
        }
        return res.json(user)

        
    }catch(error){
        next(error)
    }

})


export default authorizationRouter