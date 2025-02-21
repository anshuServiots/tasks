import express from "express";
import { validateCreateAccountReq , validateUserLoginReq ,validateUploadPhoto} from "../util";
const router = express.Router()
import { HandelCreateUserAccount , HandelUserLogin , HandelUploadPhoto} from "../controller";
import { checkAuth } from "../middleware";


router.post('/createAccount' , validateCreateAccountReq , HandelCreateUserAccount)

router.post('/loginUser' , validateUserLoginReq, HandelUserLogin)

router.post('/uploadPhoto' ,  validateUploadPhoto ,checkAuth , HandelUploadPhoto)

export default router