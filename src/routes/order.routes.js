import { Router } from "express";
import {
  createOrder,
  getStudentOrders,
} from "../controllers/order.controllers.js";

const router = Router();

// create delivery order
router.route("/create").post(createOrder);

// get orders of logged in student
router.route("/my-orders").get(getStudentOrders);

export default router;
