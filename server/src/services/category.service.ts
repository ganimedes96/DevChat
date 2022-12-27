import { PrismaClient } from "@prisma/client";
import { ICategory } from "../interfaces/ICategory";
import { tokenUsername } from "../utils/tokenUsername";
import UserService from "./user.service";

export default class CategoryService {
  prisma = new PrismaClient();
  userService = new UserService();

  public createCategory = async (categories: ICategory, username: string) => {
    const user = await this.userService.getLoggedInUser(username);
    const { category } = categories;

    const newCategory = await this.prisma.categories.create({
      data: {
        category: category.toLowerCase(),
        userId: String(user?.id),
      },
    });
    return newCategory;
  };

  public deleteCategory = async (category: string, token: string) => {
    const username = await tokenUsername(token)
    const getUser = await this.prisma.categories.findMany()
    const userLogged = await this.userService.getLoggedInUser(username)  
    const isUserAuthorization = getUser.some((user) => user.userId === userLogged?.id)
    if (!isUserAuthorization) {
      return {type: 401, message: 'user not authorization!'}
    }
    await this.prisma.categories.deleteMany({
      where: { category: category },
    });
    return {type: 200, message: 'ok'}
  };

  public getCategory = async () => {
    const categories = await this.prisma.categories.findMany();
    return categories;
  };

  public getCategoryId = async (category: string) => {
    const categoryId = await this.prisma.categories.findMany({
      where: {
        category,
      },
      select: {
        id: true,
      },
    });
    return categoryId;
  };
}
