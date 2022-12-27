import express from "express";
import CategoryController from "../controllers/category.controller";
import CategoryService from "../services/category.service";
import MiddlewareCategory from '../middlewares/category'

const router = express.Router();
const middlewareCategory = new MiddlewareCategory()
const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService);

router.post("/register",middlewareCategory.categoryValidation, categoryController.createCategory);
router.get("/", categoryController.listCategory);
router.get('/:category', categoryController.deleteCategory)

export default router;
