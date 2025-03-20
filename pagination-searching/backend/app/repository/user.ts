import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function insertDetails(id : number , first_name : string , last_name : string , email : string , gender : string , ip_address : string){
    try{
        return await prisma.user.create({
            data:{
                id,
                first_name ,

                last_name,
                gender,
                email,
                ip_address
            }
        })
    
    }
    catch(er){
        return 0
    }
    
}

export async function getData(skip : number , orderByy : string  , sortIn : string , take : number ) {
    const data =  await prisma.user.findMany({
        skip ,
        take ,
        orderBy :{
            [orderByy] : sortIn
        }
    })

    return {count : 1000 , data}
}

export async function getDataBasedOnFirstName(skip : number , orderByy : string  , sortIn : string , first_name: string , take : number) {

    const count =  await prisma.user.count({

        where:{
            first_name:{
                contains: first_name, 
                mode: "insensitive",
            }
        }
    })

    const data =  await prisma.user.findMany({
        skip ,
        take ,
        
        orderBy :{
            [orderByy] : sortIn
        },
        where:{
            first_name:{
                contains: first_name, 
                mode: "insensitive",
            }
        }

    })
    return {count , data}

}