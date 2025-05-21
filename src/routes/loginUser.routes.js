import express from 'express';
import { loginUser } from '../services/loginUser.service.js';

const router = express.Router();

router.post('/login', loginUser);
// router.post('/register', registerUser);

export default router;
