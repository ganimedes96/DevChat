import { PrismaClient } from "@prisma/client";
import { IMessage } from "../interfaces/IMessage";
import CategoryService from "./category.service";

export default class messageService {
  prisma = new PrismaClient();
  public createNewMessage = async (
    messageInfo: IMessage,
    category: string,
    username: string
  ) => {
    const getCategoryId = await this.prisma.categories.findMany({
      where: {
        category,
      },
      select: {
        id: true,
      },
    });
    const getUserId = await this.prisma.user.findMany({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    const userId = getUserId[0].id;
    const categoryId = getCategoryId[0].id;
    const newMessage = await this.prisma.messages.create({
      data: {
        content: messageInfo.content,
        categoriesId: categoryId,
        userId: userId,
      },
    });
    return newMessage;
  };

  public filterMessageCategory = async (category: string) => {
    const listCategories = await this.prisma.categories.findMany({
      where: {
        category,
      },
      select: {
        id: true,
      },
    });

    const categoryId = listCategories[0].id;

    const listMessage = await this.prisma.messages.findMany({
      where: {
        categoriesId: categoryId,
      },
      select: {
        content: true,
        User: {
          select: {
            username: true,
          },
        },
      },
    });
    return listMessage;
  };
}
