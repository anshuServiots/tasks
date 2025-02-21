import {Response} from "express"

//import { body} from "express-validator"
const {body} = require("express-validator")
const validateCreateAccountReq  = [
    body('userName').notEmpty().trim().withMessage('pls send user name') ,
    body('userName').isLength({min : 5 , max : 30}).withMessage('userName size should be between 5 and 30') ,
    
    body('userEmail').notEmpty().withMessage('pls send user email') ,
    body('userEmail').isEmail().trim().withMessage('pls send valid email') ,
    
    body('userPassword').notEmpty().withMessage('pls send user password') ,
    body('userPassword').isLength({min : 5 , max : 30}).trim().withMessage('userName size should be between 5 and 30') ,
    
]
const validateUserLoginReq  = [
   
    body('userEmail').notEmpty().withMessage('pls send user email') ,
    body('userEmail').isEmail().trim().withMessage('pls send valid email') ,
    
    body('userPassword').notEmpty().trim().withMessage('pls send user password') ,
    body('userPassword').isLength({min : 5 , max : 30}).withMessage('userName size should be between 5 and 30') ,
    
]
const validateUploadPhoto  = [
   
    body('photo').notEmpty().withMessage('pls send photo') ,
    body('photo').isLength({min : 5 , max : 30}).withMessage('send full string for photo') ,
    
    body('photoTitle').notEmpty().trim().withMessage('pls send photo title') ,
    body('photoTitle').isLength({min : 5 , max : 30}).withMessage('photo title size should be between 5 and 30') ,
    
    body('photoDesc').notEmpty().trim().withMessage('pls send photo Desc') ,
    body('photoTitle').isLength({min : 10 , max : 100}).withMessage('photo Desc size should be between 5 and 30') ,
    
    body('photoTitle').notEmpty().trim().withMessage('pls send photo title') ,
    body('photoTitle').isLength({min : 5 , max : 30}).withMessage('photo title size should be between 5 and 30') ,
    
    body('photoTags').isArray().trim().withMessage('pls send photo tags') ,
    body('photoTags').isLength({min : 5 , max : 30}).withMessage('photo tags size should be between 5 and 30') ,
    
]

function defaultRes(
    res : Response,
    status : number,
    msg : string , 
    err ? : any,
    data ? : any
){
    return res.status(status).json({
        status : status ,
        message : msg,
        data : data || null ,
        err : err || null
    })
}


class CustomError extends Error {
    statusCode: number;
    message: any ;

    constructor(message: any, statusCode: number) {
        super(message); 
        this.statusCode = statusCode;
        this.message = message;
    }

}


export  {validateCreateAccountReq , validateUserLoginReq , defaultRes , CustomError , validateUploadPhoto}