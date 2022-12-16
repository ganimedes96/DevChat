import { tokenUsername } from './../utils/tokenUsername';
import { Request, Response } from "express";
import UserService from "../services/user.service";

export default class UserController {
  constructor(private _userService: UserService) {}

  public createUser = async (req: Request, res: Response) => {
    try {
      const user = req.body;
      const newUser = await this._userService.createUser(user);
      res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating user, try again" });
    }
  };

  public getUsers = async (req:Request, res:Response) => {
    try {
        const users = await this._userService.getUsers()
        res.status(200).json(users)
        
    } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error returning user list, try again" });  
                    
    }
  }

  public getLoggedInUser = async (req:Request, res:Response) => {
    try {
        const token = req.headers.authorization
        
        const username = await tokenUsername(String(token)) 
        const getUser = await this._userService.getLoggedInUser(username)
        
        res.status(200).json(getUser)
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching user, please try again" });
    }
  }
}
