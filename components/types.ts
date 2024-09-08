export interface ITracker {
  id: number;
  created_at: string;
  tracker_date: string;
  tracker_type: string;
  project_id: string;
  projects: IProject;
  timing: number;
  detail: string;
  created_by: string;
}

export interface IProject {
  id: string;
  name: string;
  code: string;
}
