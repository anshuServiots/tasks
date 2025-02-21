const { validationResult } = require("express-validator");
import { CustomError } from "../util";

//import {validationResult} from "express-validator"
import { Request } from "express";
// Check Validation For Requests


 const checkValidation = (req: Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // const validationError = {
    //   message: errors.errors,
    // };
    // throw validationError;
    throw new CustomError(errors.errors , 400)
  }
};


export  {checkValidation}
