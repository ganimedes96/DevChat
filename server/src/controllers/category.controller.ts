import { Request, Response } from "express";
import CategoryService from "../services/category.service";
import { tokenUsername } from "../utils/tokenUsername";

export default class CategoryController {
    constructor(private _categoryService: CategoryService ) {}
    public createCategory = async (req:Request, res:Response) => {
        try {
           const category = req.body
           const token = req.headers.authorization
           const username = await tokenUsername(String(token))
           const newCategory = await this._categoryService.createCategory(category, username)
           res.status(201).json(newCategory)     
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error creating category, try again" });
            
        }
    } 

    public deleteCategory = async (req: Request, res:Response) => {
        const {category} = req.params
        const token = req.headers.authorization 
        const { type, message } = await this._categoryService.deleteCategory(String(category),String(token))
        res.status(type).json(message)
    }
    
    public listCategory = async (req:Request, res:Response) => {
        try {
            const listCategories = await this._categoryService.getCategory()
            res.status(200).json(listCategories)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error returning list category, try again" });
        }
    }
}