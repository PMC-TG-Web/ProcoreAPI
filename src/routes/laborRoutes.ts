import { Router } from 'express';
import { LaborController } from '../controllers/laborController';

const router = Router();

// Route for labor summary by project
router.get('/summary/:projectId', LaborController.getProjectLaborSummary);

export default router;
