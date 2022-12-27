import { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import UserService from '../services/user.service' 

export default class CreateCategoryValidation {
    
    public categoryValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { category } = req.body;

    const prisma = new PrismaClient();
    const categories = await prisma.categories.findMany();

    const userAlreadyExists = categories.some(
      (cat) => cat.category === category
    );

    if (userAlreadyExists) {
      return res.status(400).json({ message: "Category already exists!" });
    }
    next();
  };

}
