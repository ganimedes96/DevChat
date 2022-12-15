import express from "express";
import UserController from "../controllers/user.controller";
import UserService from "../services/user.service";
import Middleware from "../middlewares/user";
import Token from "../middlewares/token";

const router = express.Router();
const userService = new UserService();
const userController = new UserController(userService);
const middleware = new Middleware();
const token = new Token();

router.post("/register", middleware.userValidation, userController.createUser);
router.get("/", userController.getUsers);
router.get("/logged", token.validationToken, userController.getLoggedInUser);
export default router;
