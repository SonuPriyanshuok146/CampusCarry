import { body } from "express-validator";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),

    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username must be lowercase")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters"),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

    body("role")
      .optional()
      .isIn(["student", "guard", "admin"])
      .withMessage("Role must be student, guard or admin"),

    body("phoneNumber")
      .optional()
      .isMobilePhone()
      .withMessage("Invalid phone number"),

    body("fullName")
      .optional()
      .trim(),

    body("hostelName").optional().trim(),

    body("roomNumber").optional().trim(),
  ];
};

const loginValidator = () => {
  return [
    body("email").optional().isEmail().withMessage("Invalid email"),

    body("username").optional().trim(),

    body("password").notEmpty().withMessage("Password is required"),
  ];
};

export { userRegisterValidator, loginValidator };
