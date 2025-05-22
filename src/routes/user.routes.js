import express from 'express';
import { loginUser, registerUser } from '../services/user.service.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
