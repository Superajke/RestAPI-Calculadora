import { Router } from "express";
import errorController from "./user.routes.js";

const router = Router();

router.use("/calculator", errorController);

export default router;
