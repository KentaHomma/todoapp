'use client';

import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: '買い物リストを作成する',
      category: '買い物',
      dueDate: '2024/01/31',
      completed: false
    },
    {
      id: 2,
      title: 'メールを確認する',
      category: '仕事',
      dueDate: null,
      completed: true
    }
  ]);

  const handleToggleComplete = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          <div className="todo-item-checkbox">
            <input
              type="checkbox"
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
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
            <button className="btn-icon">
              <IconTrash size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 