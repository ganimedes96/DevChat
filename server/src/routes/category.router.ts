import express from "express";
import CategoryController from "../controllers/category.controller";
import CategoryService from "../services/category.service";

const router = express.Router();
const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService);

router.post("/register", categoryController.createCategory);
router.get("/", categoryController.listCategory);

export default router;
