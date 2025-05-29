import express from 'express';
import {
  loginUser,
  registerUser,
  getAllUsers,
  updateUserRole,
} from '../services/user.service.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);

export default router;
