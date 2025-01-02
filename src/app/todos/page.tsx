import TodoHeader from '@/components/todos/todo-header';
import TodoList from '@/components/todos/todo-list';
import TodoCategories from '@/components/todos/todo-categories';

export default function TodosPage() {
  return (
    <div className="dashboard-main">
      <header className="dashboard-header">
        <h1>TODOリスト</h1>
      </header>
      <div className="todos-container">
        <div className="todos-sidebar">
          <TodoCategories />
        </div>
        <div className="todos-main">
          <TodoHeader />
          <TodoList />
        </div>
      </div>
    </div>
  );
} 