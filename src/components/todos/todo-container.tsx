'use client';

import { useTodo } from '@/contexts/TodoContext';
import Loading from '@/components/common/loading';
import TodoCategories from './todo-categories';
import TodoHeader from './todo-header';
import TodoList from './todo-list';

export default function TodoContainer() {
  const { isLoading } = useTodo();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="todos-container">
      <div className="todos-sidebar">
        <TodoCategories />
      </div>
      <div className="todos-main">
        <TodoHeader />
        <TodoList />
      </div>
    </div>
  );
} 