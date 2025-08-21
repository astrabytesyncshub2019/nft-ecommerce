import { body } from "express-validator"

export const registerValidations = [
    body("fullname.firstname")
        .trim()
        .notEmpty().withMessage("First name is required")
        .isLength({ min: 3 }).withMessage("First name must be at least 3 charcters")
        .isLength({ max: 50 }).withMessage("First name must be smaller then 50 characters"),
    body("fullname.lastname")
        .trim()
        .isLength({ max: 50 }).withMessage("Last name must be smaller than 50 characters"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format"),
    body("password")
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 charcters"),
    body("phonenumber")
        .trim()
        .notEmpty().withMessage("Phone number is required")
        .isMobilePhone().withMessage("Invalid phone number")
]

export const loginValidations =[
    body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),
    body("password")
    .trim()
    .notEmpty().withMessage("Password is required")
    
]