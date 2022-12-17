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
        img_url: `https://github.com/${username}.png`,
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
        img_url: true,
      },
    });
    return user;
  };

  public getUserId = async (username: string) => {
    const UserId = await this.prisma.user.findMany({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    return UserId
  }    

}
