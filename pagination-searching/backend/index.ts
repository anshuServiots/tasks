import express from "express"
import { handelPaginationReq } from "./app/controller/controller"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

app.get('/getData' , handelPaginationReq)

app.listen(3000 , ()=>{
    console.log("server is running on port 3000")
})