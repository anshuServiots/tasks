import express from "express";
import { validateCreateAccountReq , validateUserLoginReq ,validateUploadPhoto , validateComment , validateLike} from "../util";


const router = express.Router()
import { HandelCreateUserAccount , HandelUserLogin , HandelUploadPhoto , HandelAddComment , HandelPhotoLike , isTokenVerifyied } from "../controller";
import { checkAuth, defaultErr, wrongPath } from "../middleware";


router.post('/createAccount' , validateCreateAccountReq , HandelCreateUserAccount)

router.post('/loginUser' , validateUserLoginReq, HandelUserLogin)

router.post('/uploadPhoto' ,  validateUploadPhoto ,checkAuth , HandelUploadPhoto)

router.post('/comment' ,  validateComment ,checkAuth , HandelAddComment)

router.put('/like' ,  validateLike ,checkAuth , HandelPhotoLike)

router.post('/verifyToken' , isTokenVerifyied)



export default router