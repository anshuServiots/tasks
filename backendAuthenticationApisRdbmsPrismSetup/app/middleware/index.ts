import {  Response , Request , NextFunction  } from "express";
import { CustomError } from "../util";
import { json } from "stream/consumers";
import { defaultRes } from "../util";
import  jwt  from "jsonwebtoken";
import { getEnvVariables } from "../../getenv";

const SECRET_KEY = getEnvVariables().SECRET_KEY as string

function defaultErr(err : any ,  req : Request , res : Response  , next :NextFunction ){

    if (err instanceof CustomError) {
      
        res.status(err.statusCode).json({ 
            msg: err.message,
            error: err
        });
    } else {
       
        res.status(500).json({
            msg: 'An unexpected error occurred.',
            error: err.message || 'Internal Server Error'
        });
    }

    // console.log("err came in default err fun" , err)
    // res.status(401).json({ error : err })
}

  
function checkAuth(req : Request  , res : Response , next : NextFunction){
    const authHeader = req?.headers?.authorization
   
    const token = authHeader?.split(" ")?.[1] as string

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomError("unauthorized, pls enter valid token" , 400)
    }
   
    console.log(token)
    
    try{
        const jwtPayload = jwt.verify(token , SECRET_KEY)  
        req.body.user = jwtPayload 
    }
    catch(error){
        throw new CustomError("invalid Token" , 400)
    }  
    
    next()
}


function wrongPath(err : any ,  req : Request , res : Response  , next :NextFunction ){
    console.log('=---------------' , err)
    if(!err){
        console.log(" ------------------")
        throw new CustomError('path does not exist' , 400)
        
    }else{
        next(err)
    }
    
}


export {defaultErr , checkAuth , wrongPath}