import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export default class MiddlewareLogin {
  public validationLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const prisma = new PrismaClient();
    const { username, password } = req.body;

    const getUsers = await prisma.user.findMany();

    const getUsername = getUsers.some((name) => name.username === username);

    const getPassword = getUsers.some((pass) => pass.password === password);

    if (!getUsername || !getPassword) {
      return res
        .status(401)
        .json({ message: "username or password incorrect" });
    }

    next();
  };
}
