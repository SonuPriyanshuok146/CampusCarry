import { Router } from "express";
import { assignToken, releaseToken } from "../controllers/token.controllers.js";

const router = Router();

// guard assigns token to delivery
router.route("/assign").post(assignToken);

// release token when student collects parcel
router.route("/release").post(releaseToken);

export default router;
