export interface TaskDetails {
  id: number;
  todo: string;
  completed: boolean;
}

export interface TaskList {
  todos: TaskDetails[];
  total: number;
  skip: number;
  limit: number;
}

export interface TaskListFilter {
  limit: number;
  skip: number;
  total: number;
}

export interface UpdateTaskForm {
  todo: string;
  completed: boolean;
}
