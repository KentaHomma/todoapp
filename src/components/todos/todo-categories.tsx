'use client';

import { IconFolder, IconPlus } from '@tabler/icons-react';

export default function TodoCategories() {
  return (
    <div className="todo-categories">
      <div className="categories-header">
        <h3>カテゴリー</h3>
        <button className="btn-icon">
          <IconPlus size={20} />
        </button>
      </div>
      <div className="categories-list">
        <div className="category-item active">
          <IconFolder size={18} />
          <span>すべて</span>
          <span className="category-count">5</span>
        </div>
        <div className="category-item">
          <IconFolder size={18} />
          <span>仕事</span>
          <span className="category-count">2</span>
        </div>
        <div className="category-item">
          <IconFolder size={18} />
          <span>買い物</span>
          <span className="category-count">1</span>
        </div>
        <div className="category-item">
          <IconFolder size={18} />
          <span>個人</span>
          <span className="category-count">2</span>
        </div>
      </div>
    </div>
  );
} 