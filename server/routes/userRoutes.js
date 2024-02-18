// routes/userRoutes.js
import { Signup, SignIN, SignOut } from "../controllers/userController.js";
import { Router } from "express";

const router = Router();

router.post("/signup", Signup);
router.post("/signin", SignIN);
router.get("/signout", SignOut);

export default router;
