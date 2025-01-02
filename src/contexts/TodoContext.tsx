'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Todo, Category } from '@/types/todo';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface TodoContextType {
  todos: Todo[];
  categories: Category[];
  selectedCategory: string;
  isLoading: boolean;
  addTodo: (todo: Omit<Todo, 'id'>) => Promise<void>;
  updateTodo: (todo: Todo) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  toggleTodoComplete: (id: number) => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  setSelectedCategory: (category: string) => void;
  logout: () => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // データの初期読み込み
  useEffect(() => {
    fetchInitialData();
  }, []);

  async function fetchInitialData() {
    try {
      setIsLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      const userId = session.user.id;
      
      // カテゴリーの取得（ユーザーIDでフィルタリング）
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (categoriesError) throw categoriesError;

      // TODOの取得（ユーザーIDでフィルタリング）
      const { data: todosData, error: todosError } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (todosError) throw todosError;

      // データの整形
      const formattedCategories = [
        { id: 0, name: 'すべて', count: todosData.length },
        ...categoriesData.map((category: any) => ({
          id: category.id,
          name: category.name,
          count: todosData.filter((todo: any) => todo.category === category.name).length
        }))
      ];

      setCategories(formattedCategories);
      setTodos(todosData.map((todo: any) => ({
        id: todo.id,
        title: todo.title,
        category: todo.category,
        dueDate: todo.due_date,
        completed: todo.completed,
        priority: todo.priority
      })));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addTodo(todo: Omit<Todo, 'id'>) {
    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([{
          title: todo.title,
          category: todo.category,
          due_date: todo.dueDate,
          completed: todo.completed,
          priority: todo.priority
        }])
        .select()
        .single();

      if (error) throw error;

      const newTodo = {
        id: data.id,
        title: data.title,
        category: data.category,
        dueDate: data.due_date,
        completed: data.completed,
        priority: data.priority
      };

      setTodos(prev => [...prev, newTodo]);
      updateCategoryCounts([...todos, newTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  async function updateTodo(todo: Todo) {
    try {
      const { error } = await supabase
        .from('todos')
        .update({
          title: todo.title,
          category: todo.category,
          due_date: todo.dueDate,
          completed: todo.completed,
          priority: todo.priority
        })
        .eq('id', todo.id);

      if (error) throw error;

      const updatedTodos = todos.map(t => t.id === todo.id ? todo : t);
      setTodos(updatedTodos);
      updateCategoryCounts(updatedTodos);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }

  async function deleteTodo(id: number) {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
      updateCategoryCounts(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  async function toggleTodoComplete(id: number) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      const { error } = await supabase
        .from('todos')
        .update({ completed: !todo.completed })
        .eq('id', id);

      if (error) throw error;

      const updatedTodos = todos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  }

  async function addCategory(name: string) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{ name }])
        .select()
        .single();

      if (error) throw error;

      const newCategory = {
        id: data.id,
        name: data.name,
        count: 0
      };

      setCategories(prev => [...prev, newCategory]);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  }

  function updateCategoryCounts(updatedTodos: Todo[]) {
    const counts = updatedTodos.reduce((acc, todo) => {
      acc[todo.category] = (acc[todo.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    setCategories(categories.map(category => ({
      ...category,
      count: category.name === 'すべて' ? updatedTodos.length : counts[category.name] || 0
    })));
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <TodoContext.Provider value={{
      todos,
      categories,
      selectedCategory,
      isLoading,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleTodoComplete,
      addCategory,
      setSelectedCategory,
      logout: handleLogout
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