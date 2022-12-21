import { PrismaClient } from "@prisma/client";
import { IMessage } from "../interfaces/IMessage";
import CategoryService from "./category.service";
import UserService from "./user.service";

export default class messageService {
  prisma = new PrismaClient();
  userService = new UserService();
  categoryService = new CategoryService();
  public createNewMessage = async (
    messageInfo: IMessage,
    category: string,
    username: string
  ) => {
    const getCategoryId = await this.categoryService.getCategoryId(category);
    const getUserId = await this.userService.getUserId(username);

    const userId = getUserId?.id ;
    const categoryId = getCategoryId[0].id;

    const newMessage = await this.prisma.messages.create({
      data: {
        content: messageInfo.content,
        categoriesId: categoryId,
        userId: String(userId),
      },
    });
    return newMessage;
  };

  public filterMessageByCategory = async (category: string) => {
    const getCategoryId = await this.categoryService.getCategoryId(category);

    const categoryId = getCategoryId[0].id;

    const listMessageFilterByCategory = await this.prisma.messages.findMany({
      where: {
        categoriesId: categoryId,
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        content: true,
        User: {
          select: {
            username: true,
            img_url: true,
          },
        },
      },
    });
    return listMessageFilterByCategory;
  };
}
