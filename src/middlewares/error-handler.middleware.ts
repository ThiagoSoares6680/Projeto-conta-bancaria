import { Request, Response, NextFunction } from 'express'
import ForbiddenError from "../model/error/forbidden.error.model";
import DatabaseError from "../model/error/database.error.model";
import { StatusCodes } from 'http-status-codes'



function errorHandler(error: any, req:Request, res:Response, next:NextFunction){
    if (error instanceof DatabaseError){
        res.sendStatus(StatusCodes.BAD_REQUEST);

    }else if(error instanceof ForbiddenError){
        res.sendStatus(StatusCodes.FORBIDDEN)
        
    }else {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default errorHandler;