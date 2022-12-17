import { PrismaClient } from "@prisma/client";
import { ICategory } from "../interfaces/ICategory";

export default class CategoryService {
  prisma = new PrismaClient();

  public createCategory = async (categories: ICategory) => {
    const { category } = categories;
    const newCategory = await this.prisma.categories.create({
      data: {
        category: category.toLowerCase(),
      },
    });
    return newCategory;
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
    return categoryId
  }
}
