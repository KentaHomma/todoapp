'use client';

import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import TodoModal from './todo-modal';

export default function TodoHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="todo-header">
        <div className="todo-actions">
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <IconPlus size={20} />
            新規タスク
          </button>
        </div>
        <div className="todo-filters">
          <select className="todo-filter-select">
            <option value="all">すべて</option>
            <option value="active">未完了</option>
            <option value="completed">完了済み</option>
          </select>
          <select className="todo-sort-select">
            <option value="created">作成日</option>
            <option value="due">期限日</option>
            <option value="priority">優先度</option>
          </select>
        </div>
      </div>
      <TodoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
} 