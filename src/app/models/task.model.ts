export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'To Do' | 'In Progress' | 'Done';
    createdAt: Date;
  }