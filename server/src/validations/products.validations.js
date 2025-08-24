import { body } from "express-validator"

export const validateProducts = [
    body("name")
        .trim()
        .notEmpty().withMessage("Product name is required")
        .isLength({ max: 100 }).withMessage("Name of product must be smaller than 101 charcters"),
    body("description")
        .trim()
        .notEmpty().withMessage("Description is required")
        .isLength({ max: 1000 }).withMessage("Description must be smaller than 1000 characters"),
    body("price")
        .trim()
        .isFloat({ min: 0 }).withMessage("Price must be greater than or equal to 0"),
    body("discount")
        .optional()
        .isInt({ min: 0, max: 100 }).withMessage("Discount must be between 0 and 100"),
    body("category")
        .notEmpty().withMessage("Category is required")
        .isIn(["backpacks", "luggage", "duffles"]).withMessage("Invalid category")


]