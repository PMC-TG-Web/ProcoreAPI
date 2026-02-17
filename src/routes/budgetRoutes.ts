import { Router } from 'express';
import { BudgetController } from '../controllers/budgetController';

const router = Router();

router.get('/summary/:projectId', BudgetController.getProjectBudgetSummary);

export default router;
