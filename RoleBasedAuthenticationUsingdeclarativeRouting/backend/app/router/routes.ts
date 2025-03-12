import express from "express";
import { validateCreateAccountReq , validateUserLoginReq ,validateUploadPhoto , validateComment , validateLike} from "../util";

const router = express.Router()
import { HandelCreateUserAccount , HandelUserLogin  } from "../controller";
import { checkAuth, defaultErr, wrongPath } from "../middleware";

router.post('/createAccount',checkAuth , validateCreateAccountReq , HandelCreateUserAccount)

router.post('/loginUser' , validateUserLoginReq, HandelUserLogin)


export default router