import { Request, Response } from "express";

import MessageService from "../services/message.service";

import { tokenUsername } from "../utils/tokenUsername";

export default class MessageController {
  constructor(private _messageService: MessageService) {}

  public createNewMessage = async (req: Request, res: Response) => {
    try {
      const content = req.body;
      const category = req.query.category as string;
      const token = req.headers.authorization;
      const username = tokenUsername(String(token));

      const newMessage = await this._messageService.createNewMessage(
        content,
        category,
        username
      );
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ message: "error creating a new message" });
    }
  };

  public getMessagesFilteredByCategory = async (
    req: Request,
    res: Response
  ) => {
    try {
      const category = req.query.category as string;
      const filterMessages = await this._messageService.filterMessageCategory(
        category
      );
      res.status(200).json(filterMessages);
    } catch (error) {
      res.status(500).json({ message: "error filtering messages" });
    }
  };
}
