import { Request  ,Response } from "express";
import { getData , getDataBasedOnFirstName } from "../repository/user";

async function handelPaginationReq(req : Request , res : Response){
     console.log(req.query)
     
     const { currentPage, orderBy , sortIn , first_name , take } = req.query as {
          currentPage: string;
          orderBy: string;
          sortIn: string;

          first_name : string;
          take : string
     };
     
     let parsedTake =  Number(take)
     

     let parsedCurrentPage = Number(currentPage);

     let  skip = (parsedCurrentPage - 1) * parsedTake
     let sortInn = sortIn
     orderBy ? orderBy : 'id'

     if(!sortIn || sortIn == "ascend"){
          sortInn = "asc"
     }
     else if(sortIn == "descend"){
          sortInn = "desc"
     }
     else{
          sortInn = "asc"
     }

     console.log('hiiii--------',orderBy , sortInn)

     if(first_name){
          if(!skip){
               const data = await getDataBasedOnFirstName(0 , "id" , "asc" , first_name , parsedTake)
               res.status(200).json(data)
          }
          else{
               const data = await getDataBasedOnFirstName(skip  , orderBy , sortIn , first_name , parsedTake)  
               res.status(200).json(data)
          }
     }
     else{
          if(!skip){
          const data = await getData(0 , orderBy ?? 'id' , sortInn , parsedTake)
          res.status(200).json(data)
          console.log(1)
          }
          else{
               const data = await getData(skip  , 'id' ,  'asc', parsedTake )  
               console.log("data==" , data)
          
               res.status(200).json(data)
               console.log(2)

          }
     }
     
}
export {handelPaginationReq}