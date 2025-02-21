import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function createAccount(userName : string , userEmail : string , userPassword : string){

    return await prisma.user.create({
        data:{
            userName,
            userEmail,
            userPassword
        }
    })
}

async function loginUser( userEmail : string , userPassword : string){

    return await prisma.user.findUnique({
        where:{
            userEmail , 
            userPassword
        }
    })
}
async function uploadPhoto(photo : string , photoTitle : string , photoDesc : string , photoTags : string[] , userId : string ){

    return await prisma.photos.create({
        data:{
            photo , 
            photoTitle , 
            photoTags ,
            photoDesc,
            userId
        }
    })
}

export {createAccount, loginUser , uploadPhoto}