import { Router } from "express";
import { verifyDelivery } from "../controllers/guard.controllers.js";

const router = Router();

// verify delivery using trackingId + OTP
router.route("/verify-delivery").post(verifyDelivery);

export default router;
