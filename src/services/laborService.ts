import { ProcoreService } from './procoreService';

export interface Timesheet {
  id: number;
  total_time: number; // in seconds or hours depending on API, usually seconds
  employee?: {
    id: number;
    name: string;
  };
  project?: {
    id: number;
    name: string;
  };
  cost_code?: {
    id: number;
    name: string;
  };
}

export class LaborService extends ProcoreService {
  /**
   * Fetches timesheets for a project and calculates total hours.
   */
  public static async calculateTotalHours(projectId: number) {
    try {
      const timesheets = await this.getRequest<Timesheet[]>('/rest/v1.0/timesheets', {
        project_id: projectId
      });

      const totalSeconds = timesheets.reduce((acc, ts) => acc + (ts.total_time || 0), 0);
      const totalHours = totalSeconds / 3600;

      return {
        projectId,
        totalHours: Math.round(totalHours * 100) / 100,
        count: timesheets.length
      };
    } catch (error) {
      console.error('Error calculating labor hours:', error);
      throw error;
    }
  }

  /**
   * Fetches timesheets and groups hours by cost code.
   */
  public static async getLaborByCostCode(projectId: number) {
    try {
      const timesheets = await this.getRequest<Timesheet[]>('/rest/v1.0/timesheets', {
        project_id: projectId
      });

      const breakdown: Record<string, number> = {};

      timesheets.forEach(ts => {
        const costCode = ts.cost_code?.name || 'Unassigned';
        const hours = (ts.total_time || 0) / 3600;
        breakdown[costCode] = (breakdown[costCode] || 0) + hours;
      });

      return Object.entries(breakdown).map(([name, hours]) => ({
        costCode: name,
        hours: Math.round(hours * 100) / 100
      }));
    } catch (error) {
      console.error('Error grouping labor by cost code:', error);
      throw error;
    }
  }
}
