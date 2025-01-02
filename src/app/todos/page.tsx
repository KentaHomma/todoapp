import TodoContainer from '@/components/todos/todo-container';

export default function TodosPage() {
  return (
    <div className="dashboard-main">
      <header className="dashboard-header">
        <h1>TODOリスト</h1>
      </header>
      <TodoContainer />
    </div>
  );
} 