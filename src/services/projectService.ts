import { ProcoreService } from './procoreService';

export interface Project {
  id: number;
  name: string;
  project_number: string;
}

export class ProjectService extends ProcoreService {
  public static async listProjects() {
    try {
      return await this.getRequest<Project[]>('/rest/v1.0/projects');
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }
}
