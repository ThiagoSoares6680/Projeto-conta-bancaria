import { NextFunction, Router, Request, Response } from "express";
import ForbiddenError from "../model/error/forbidden.error.model";
import  UsersRepository  from "../repositories/user.repository"


const authorizationRouter = Router()


authorizationRouter.post('/token', async (req: Request, res: Response, next: NextFunction)=>{

    try{
        const authorizationHeader = req.headers['authorization'];

        if(!authorizationHeader){
            throw new ForbiddenError('Credenciais não informadas!')
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if(authenticationType !== 'Basic' || !token){
            throw new ForbiddenError('Tipo de autenticação invalida!')
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8')

        const [username, password] = tokenContent.split(':')

        if(!password || !username){
            throw new ForbiddenError('Credenciais não preenchidas!')
        }

        const user = await UsersRepository.findUserNamePassword(username, password)

        console.log(user)

    }catch(error){
        next(error)
    }

})


export default authorizationRouter