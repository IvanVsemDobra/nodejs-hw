import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from '../controllers/authController.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';

const router = Router();

router.post('https://nodejs-hw-3-z4gu.onrender.com/auth/register', celebrate(registerUserSchema), registerUser);
router.post('https://nodejs-hw-3-z4gu.onrender.com/auth/login', celebrate(loginUserSchema), loginUser);
// Новий роут
router.post('https://nodejs-hw-3-z4gu.onrender.com/auth/logout', logoutUser);
router.post('https://nodejs-hw-3-z4gu.onrender.com/auth/refresh', refreshUserSession);

export default router;
