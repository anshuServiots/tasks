import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
type RoleType = "ADMIN" | "USER" | "MODERATOR"
async function createAccount(userName : string , userEmail : string , userPassword : string , Role : any ){

    return await prisma.user.create({
        data:{
            userName,
            userEmail,
            userPassword ,
            Role
        },
        select:{
            userEmail : true,
            userName : true,
            id : true

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
async function isUserExist( userEmail : string ){

    return await prisma.user.findUnique({
        where:{
            userEmail 
        }
    })
}

async function getUserRole( id : string ){

    return await prisma.user.findUnique({
        where:{
            id
        }
    })
}


export {createAccount, loginUser  , isUserExist ,getUserRole  }