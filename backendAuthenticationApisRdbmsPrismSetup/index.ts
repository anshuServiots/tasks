import express from "express"
import { getEnvVariables } from "./getenv"
import router from "./app/routes"
import { error } from "console"
import { defaultErr , wrongPath } from "./app/middleware"

const app = express()

app.use(express.json())
app.use('/' , router)


router.use(wrongPath)
router.use(defaultErr)



const PORT = getEnvVariables().PORT
app.listen( PORT , ()=>{
    console.log(`server is running on port ${PORT}`)
})