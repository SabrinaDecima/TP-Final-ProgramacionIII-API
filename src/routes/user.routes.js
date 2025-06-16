import express from 'express';
import {
  loginUser,
  registerUser,
  getAllUsers,
  updateUserRole,
  updateUser,
  pagarCuota,
  getCuotasImpagas,
  deleteUserClass,
  getSuperAdminOverview,
} from '../services/user.service.js';

import { enrollUserToClass, getUserClasses } from '../services/userGymClass.service.js'
import { verifyToken } from '../utils/auth.js';
import { authorize } from '../middlewares/authorize.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', verifyToken, getAllUsers);
router.put('/users/:id/role', verifyToken, updateUserRole);
router.put('/users/:id', verifyToken, updateUser);



router.post('/users/:userId/classes/:classId', verifyToken, enrollUserToClass);

// Obtener clases de un usuario
router.get('/users/:userId/classes', verifyToken, getUserClasses);

router.put('/cuotas/pagar', verifyToken, pagarCuota);
router.get('/users/:userId/cuotas/impagas', verifyToken, getCuotasImpagas);

router.delete('/users/:userId/classes/:classId', verifyToken, deleteUserClass);

router.get('/superadmin/overview', verifyToken, authorize('superadmin'), getSuperAdminOverview);


export default router;
