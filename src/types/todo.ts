export interface Todo {
  id: number;
  title: string;
  category: string;
  dueDate: string | null;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high';
}

export interface Category {
  id: number;
  name: string;
  count: number;
} 