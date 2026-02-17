import { Request, Response } from 'express';
import { LaborService } from '../services/laborService';

export class LaborController {
  public static async getProjectLaborSummary(req: Request, res: Response) {
    const { projectId } = req.params;

    if (!projectId) {
       res.status(400).json({ error: 'Project ID is required' });
       return;
    }

    try {
      const summary = await LaborService.calculateTotalHours(Number(projectId));
      const breakdown = await LaborService.getLaborByCostCode(Number(projectId));

      res.json({
        summary,
        breakdown
      });
    } catch (error: any) {
      res.status(500).json({ 
        error: 'Failed to fetch labor data', 
        details: error.message 
      });
    }
  }
}
