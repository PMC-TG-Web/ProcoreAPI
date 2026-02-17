import { ProcoreService } from './procoreService';

export interface BudgetLineItem {
  id: number;
  original_budget_amount: number;
  approved_changes_amount: number;
  revised_budget_amount: number;
  pending_budget_changes_amount: number;
  spent_amount: number;
}

export class BudgetService extends ProcoreService {
  /**
   * Fetches the budget for a project and calculates totals.
   */
  public static async getBudgetSummary(projectId: number) {
    try {
      const budgetItems = await this.getRequest<BudgetLineItem[]>(`/rest/v1.0/projects/${projectId}/budget_line_items`);

      const totals = budgetItems.reduce((acc, item) => {
        acc.original += Number(item.original_budget_amount || 0);
        acc.revised += Number(item.revised_budget_amount || 0);
        acc.spent += Number(item.spent_amount || 0);
        return acc;
      }, { original: 0, revised: 0, spent: 0 });

      return {
        projectId,
        originalBudget: Math.round(totals.original * 100) / 100,
        revisedBudget: Math.round(totals.revised * 100) / 100,
        spentAmount: Math.round(totals.spent * 100) / 100,
        variance: Math.round((totals.revised - totals.spent) * 100) / 100
      };
    } catch (error: any) {
      console.error('Error calculating budget summary:', error.response?.data || error.message);
      throw error;
    }
  }
}
