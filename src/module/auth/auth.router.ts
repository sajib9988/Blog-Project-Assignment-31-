import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userSchemaValidation } from "../user/userValidation";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";

export const authRouter =  Router();


authRouter.post('/register',validateRequest(userSchemaValidation), AuthControllers.register)

authRouter.post("/login",
    validateRequest(AuthValidation.loginValidationSchema), AuthControllers.login)