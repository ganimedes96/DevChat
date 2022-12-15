import { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

export default class CreateUserValidation {
  public userValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username, password } = req.body;
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany();
  
    if (username.length < 3) {
      return res.status(400).json({ message: "Invalid username" });
    }

    if (password.length < 5) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const userAlreadyExists = users.some(
      (user) => user.username === username
    );

    if (userAlreadyExists) {
      return res.status(400).json({ message: "User already exists!" });
    }
    next();
  };
}