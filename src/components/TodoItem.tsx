import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import type { Todo } from '../types';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const [hovered, setHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function commitEdit() {
    if (editValue.trim()) {
      onEdit(todo.id, editValue);
    } else {
      setEditValue(todo.text);
    }
    setEditing(false);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') commitEdit();
    if (e.key === 'Escape') {
      setEditValue(todo.text);
      setEditing(false);
    }
  }

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 group animate-slide-in"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
        aria-label={todo.completed ? '未完了に戻す' : '完了にする'}
      >
        {todo.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          className="flex-1 text-gray-700 text-base outline-none border-b-2 border-indigo-400 bg-transparent"
        />
      ) : (
        <span
          onDoubleClick={() => setEditing(true)}
          className={`flex-1 text-base cursor-pointer select-none transition-all duration-200 ${
            todo.completed
              ? 'line-through text-gray-400'
              : 'text-gray-700 hover:text-gray-900'
          }`}
        >
          {todo.text}
        </span>
      )}

      {(hovered || editing) && !editing && (
        <button
          onClick={() => onDelete(todo.id)}
          className="text-gray-300 hover:text-red-400 transition-colors"
          aria-label="削除"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
