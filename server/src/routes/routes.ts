import express from "express";
import userRouter from "./user.routes";
import categoryRouter from "./category.router";
import loginRouter from "./login.router";
import messageRouter from "./message.router";

const routers = express.Router();
routers.use("/users", userRouter);
routers.use("/login", loginRouter);
routers.use("/category", categoryRouter);
routers.use("/message", messageRouter);

export default routers;
