import { Router } from "express";

import {
  findGymClasses,
  createGymClass,
} from "../services/gymClass.service.js";

const router = Router();

router.get("/actividades", findGymClasses);
router.post("/actividades", createGymClass);

export default router;
