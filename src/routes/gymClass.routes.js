import { Router } from "express";

import {
  createGymClass,
  deleteGymClass,
  findGymClass,
  findGymClasses,
  updateGymClass,
} from "../services/gymClass.service.js";

const router = Router();

router.get("/clases", findGymClasses);

router.get("/clases/:id", findGymClass);

router.post("/clases", createGymClass);

router.put("/clases/:id", updateGymClass);

router.delete("/clases/:id", deleteGymClass);

export default router;
