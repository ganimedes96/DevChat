import { Request, Response } from "express";
import CategoryService from "../services/category.service";

export default class CategoryController {
    constructor(private _categoryService: CategoryService ) {}
    public createCategory = async (req:Request, res:Response) => {
        try {
           const category = req.body
           const newCategory = await this._categoryService.createCategory(category)
           res.status(201).json(newCategory)     
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error creating category, try again" });
            
        }
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