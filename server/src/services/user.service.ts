import { PrismaClient } from "@prisma/client";
import { IUser } from "../interfaces/IUser";

export default class UserService {
  prisma = new PrismaClient();
  public createUser = async (user: IUser) => {
    const { password, username } = user;
    const newUser = await this.prisma.user.create({
      data: {
        username,
        password,
      },
    });
    return newUser;
  };

  public getUsers = async () => {
    const users = await this.prisma.user.findMany();
    return users;
  };

  public getLoggedInUser = async (username: string) => {
    const user = this.prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        username: true,
      },
    });
    return user;
  };
}
