export type TaskStatus = 'to-do' | 'in-progress' | 'completed' | 'wont-do';

export interface Task {
  _id: string; // Required
  title: string;
  description: string;
  completed: boolean;
  status: string; // Use TaskStatus type here
}

export interface NewTask {
  title: string;
  description: string;
  completed: boolean;
  status: string; // Use TaskStatus type here
  _id?: string; // Optional
}
