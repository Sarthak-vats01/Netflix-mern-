import { Router } from "express";
import { GetMyList, CreateList } from "../controllers/listController.js";

const router = Router();

router.get("/getList/:id", GetMyList);
router.post("/createList/:id", CreateList);

export default router;
