'use client';

import { useState } from 'react';
import { useTodo } from '@/contexts/TodoContext';
import { IconX } from '@tabler/icons-react';

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TodoModal({ isOpen, onClose }: TodoModalProps) {
  const { categories, addTodo } = useTodo();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !category) return;

    await addTodo({
      title: title.trim(),
      category,
      dueDate: dueDate || null,
      completed: false,
      priority
    });

    // フォームをリセット
    setTitle('');
    setCategory('');
    setDueDate('');
    setPriority('medium');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>新規タスク</h3>
          <button className="btn-icon" onClick={onClose}>
            <IconX size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">タイトル*</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="タスクのタイトルを入力"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">カテゴリー*</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">カテゴリーを選択</option>
              {categories
                .filter(cat => cat.name !== 'すべて')
                .map(cat => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">期限</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="priority">優先度</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            >
              <option value="low">低</option>
              <option value="medium">中</option>
              <option value="high">高</option>
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              キャンセル
            </button>
            <button type="submit" className="btn-primary">
              追加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 