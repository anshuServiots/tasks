import express from "express"
//import { getEnvVariables } from "./getenv"
import router from "./app/router/routes"
 import { error } from "console"
 import { defaultErr , wrongPath } from "./app/middleware"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())
app.use('/' , router)


router.use(wrongPath)
router.use(defaultErr)



const PORT = 2001
app.listen( PORT , ()=>{
    console.log(`server is running on port ${PORT}`)
})