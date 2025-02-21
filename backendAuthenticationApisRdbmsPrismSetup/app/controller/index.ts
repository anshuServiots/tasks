import { Request , Response , NextFunction } from "express";
import { defaultRes } from "../util";
import { checkValidation } from "../helper";
import { createAccount, loginUser , uploadPhoto} from "../repository";
import { defaultErr } from "../middleware";
import { CustomError } from "../util";
import jwt from "jsonwebtoken"
import { getEnvVariables } from "../../getenv";

const SECRET_KEY = getEnvVariables().SECRET_KEY  as string

console.log(SECRET_KEY)


async function HandelCreateUserAccount(req : Request , res : Response , next : NextFunction){

    try{

        checkValidation(req)

        const { userName, userEmail, userPassword }: { userName: string, userEmail: string, userPassword: string } = req.body;

        const createAccountRes = await createAccount(userName , userEmail , userPassword)

        defaultRes(res , 200 , "ok" , null , createAccountRes)
        
    }
    catch(error){
        console.log(error)
        next(error)
    }
    
}


async function HandelUserLogin(req : Request , res : Response , next : NextFunction){

    try{

        checkValidation(req)

        const {userEmail, userPassword }: {  userEmail: string, userPassword: string } = req.body;

        const loginUserRes = await loginUser(userEmail , userPassword)

        if(!loginUserRes){
            throw new CustomError("wrong email or password" , 400)
        }

        const dataTOMakeToken = {
            userId : loginUserRes.id,
            userName : loginUserRes.userName
        } 
        const tokenToSend = jwt.sign( dataTOMakeToken , SECRET_KEY ,{expiresIn : '10m'})

        defaultRes(res , 200 , "account logged in , token generated" , null , tokenToSend)

        
    }
    catch(error){
        console.log(error)
        next(error)
    }
    
}


async function HandelUploadPhoto(req : Request , res : Response , next : NextFunction){

    try{

        checkValidation(req)
        const {photo , photoTitle , photoDesc , photoTags , userId} : {photo:string , photoTitle:string ,  photoDesc:string ,  photoTags:string [] ,  userId:string } = req.body
       
        const uploadPhotoRes = await uploadPhoto(photo , photoTitle , photoDesc , photoTags , userId )

        // if(!loginUserRes){
        //     throw new CustomError("wrong email or password" , 400)
        // }

        // const dataTOMakeToken = {
        //     userId : loginUserRes.id,
        //     userName : loginUserRes.userName
        // } 
       

        defaultRes(res , 200 , "account logged in , token generated" , null , uploadPhotoRes)

        
    }
    catch(error){
        console.log(error)
        next(error)
    }
    
}

export {HandelCreateUserAccount , HandelUserLogin , HandelUploadPhoto}