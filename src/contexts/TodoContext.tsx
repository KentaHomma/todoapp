'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Todo, Category } from '@/types/todo';

interface TodoContextType {
  todos: Todo[];
  categories: Category[];
  selectedCategory: string;
  addTodo: (todo: Omit<Todo, 'id'>) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  toggleTodoComplete: (id: number) => void;
  addCategory: (name: string) => void;
  setSelectedCategory: (category: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: '買い物リストを作成する',
      category: '買い物',
      dueDate: '2024/01/31',
      completed: false,
      priority: 'medium'
    },
    {
      id: 2,
      title: 'メールを確認する',
      category: '仕事',
      dueDate: null,
      completed: true,
      priority: 'high'
    }
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'すべて', count: 2 },
    { id: 2, name: '仕事', count: 1 },
    { id: 3, name: '買い物', count: 1 },
    { id: 4, name: '個人', count: 0 }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('すべて');

  const updateCategoryCounts = (updatedTodos: Todo[]) => {
    const counts = updatedTodos.reduce((acc, todo) => {
      acc[todo.category] = (acc[todo.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    setCategories(categories.map(category => ({
      ...category,
      count: category.name === 'すべて' ? updatedTodos.length : counts[category.name] || 0
    })));
  };

  const addTodo = (todo: Omit<Todo, 'id'>) => {
    const newTodo = {
      ...todo,
      id: todos.length + 1
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    updateCategoryCounts(updatedTodos);
  };

  const updateTodo = (updatedTodo: Todo) => {
    const updatedTodos = todos.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    setTodos(updatedTodos);
    updateCategoryCounts(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    updateCategoryCounts(updatedTodos);
  };

  const toggleTodoComplete = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const addCategory = (name: string) => {
    if (categories.some(category => category.name === name)) return;
    setCategories([...categories, { id: categories.length + 1, name, count: 0 }]);
  };

  return (
    <TodoContext.Provider value={{
      todos,
      categories,
      selectedCategory,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleTodoComplete,
      addCategory,
      setSelectedCategory
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
} 