import { Request, Response } from 'express';
import { BudgetService } from '../services/budgetService';

export class BudgetController {
  public static async getProjectBudgetSummary(req: Request, res: Response) {
    const { projectId } = req.params;

    if (!projectId) {
      res.status(400).json({ error: 'Project ID is required' });
      return;
    }

    try {
      const summary = await BudgetService.getBudgetSummary(Number(projectId));
      res.json(summary);
    } catch (error: any) {
      res.status(500).json({ 
        error: 'Failed to fetch budget data', 
        details: error.message 
      });
    }
  }
}
