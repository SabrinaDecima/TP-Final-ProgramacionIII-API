import { Router } from "express";

import {
  createGymClass,
  deleteGymClass,
  findGymClass,
  findGymClasses,
  updateGymClass,
  getUsersByClass
} from "../services/gymClass.service.js";
import { verifyToken } from "../utils/auth.js";

const router = Router();

router.get("/clases", verifyToken, findGymClasses);

router.get("/clases/:id", verifyToken, findGymClass);

router.post("/clases", verifyToken, createGymClass);

router.put("/clases/:id", verifyToken, updateGymClass);

router.delete("/clases/:id", verifyToken, deleteGymClass);

router.get('/clases/:id/users', verifyToken, getUsersByClass);

export default router;
