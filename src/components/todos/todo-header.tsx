'use client';

import { IconPlus } from '@tabler/icons-react';

export default function TodoHeader() {
  return (
    <div className="todo-header">
      <div className="todo-actions">
        <button className="btn-primary">
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
  );
} 