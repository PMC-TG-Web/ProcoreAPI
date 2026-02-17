import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();

// Route to start the OAuth flow
router.get('/login', AuthController.login);

// Route to handle the Procore callback
router.get('/procore/callback', AuthController.callback);

export default router;
