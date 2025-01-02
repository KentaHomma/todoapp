'use client';

import { IconFolder, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { useTodo } from '@/contexts/TodoContext';

export default function TodoCategories() {
  const { categories, selectedCategory, setSelectedCategory, addCategory } = useTodo();
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.trim());
      setNewCategoryName('');
      setIsAdding(false);
    }
  };

  return (
    <div className="todo-categories">
      <div className="categories-header">
        <h3>カテゴリー</h3>
        <button className="btn-icon" onClick={() => setIsAdding(true)}>
          <IconPlus size={20} />
        </button>
      </div>
      {isAdding && (
        <div className="category-input">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="新しいカテゴリー"
            onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
          />
        </div>
      )}
      <div className="categories-list">
        {categories.map(category => (
          <div
            key={category.id}
            className={`category-item ${selectedCategory === category.name ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <IconFolder size={18} />
            <span>{category.name}</span>
            <span className="category-count">{category.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 