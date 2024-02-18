// routes/userRoutes.js
import { Router } from "express";
import authenticateToken from "../auth/auth.js";

const router = Router();

router.get("/protected", authenticateToken);

export default router;
