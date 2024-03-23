import { Router } from "express";
import { calculator
} from "../controllers/calculator.controller.js";
const router = Router();

router.post("/", calculator);

export default router;
