'use client';

import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useTodo } from '@/contexts/TodoContext';

export default function TodoList() {
  const { todos, selectedCategory, toggleTodoComplete, deleteTodo } = useTodo();

  const filteredTodos = selectedCategory === 'すべて'
    ? todos
    : todos.filter(todo => todo.category === selectedCategory);

  return (
    <div className="todo-list">
      {filteredTodos.map(todo => (
        <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          <div className="todo-item-checkbox">
            <input
              type="checkbox"
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onChange={() => toggleTodoComplete(todo.id)}
            />
          </div>
          <div className="todo-item-content">
            <label htmlFor={`todo-${todo.id}`}>{todo.title}</label>
            <span className="todo-item-category">{todo.category}</span>
            <span className="todo-item-due">
              {todo.completed ? '完了済み' : todo.dueDate ? `期限: ${todo.dueDate}` : '期限なし'}
            </span>
          </div>
          <div className="todo-item-actions">
            <button className="btn-icon">
              <IconEdit size={18} />
            </button>
            <button className="btn-icon" onClick={() => deleteTodo(todo.id)}>
              <IconTrash size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 