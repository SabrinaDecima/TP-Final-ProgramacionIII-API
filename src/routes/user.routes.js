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

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.put('/users/:id', updateUser);



router.post('/users/:userId/classes/:classId', enrollUserToClass);

// Obtener clases de un usuario
router.get('/users/:userId/classes', getUserClasses);

router.put('/cuotas/pagar', pagarCuota);
router.get('/users/:userId/cuotas/impagas', getCuotasImpagas);

router.delete('/users/:userId/classes/:classId', deleteUserClass);

router.get('/superadmin/overview', getSuperAdminOverview);


export default router;
