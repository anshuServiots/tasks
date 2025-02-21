import  dotenv  from "dotenv" 
dotenv.config()

function getEnvVariables(){
    const PORT = process.env.PORT
    const SECRET_KEY = process.env.SECRET_KEY

    return {
        PORT , SECRET_KEY
    }
}

export {getEnvVariables}