import express from "express";
import MiddlewareToken from "../middlewares/token";
import MessageController from "../controllers/message.controller";
import MessageService from "../services/message.service";

const router = express.Router();

const middlewaretoken = new MiddlewareToken();
const messageService = new MessageService();
const messageController = new MessageController(messageService);

router.post(
  "/",
  middlewaretoken.validationToken,
  messageController.createNewMessage
);

router.get(
  "/",
  middlewaretoken.validationToken,
  messageController.getMessagesFilteredByCategory
);
export default router;
