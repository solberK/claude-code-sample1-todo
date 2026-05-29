import { useState, type KeyboardEvent } from 'react';

interface Props {
  onAdd: (text: string) => void;
  onToggleAll: () => void;
  hasItems: boolean;
}

export function TodoInput({ onAdd, onToggleAll, hasItems }: Props) {
  const [value, setValue] = useState('');

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && value.trim()) {
      onAdd(value);
      setValue('');
    }
  }

  return (
    <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
      {hasItems && (
        <button
          onClick={onToggleAll}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 -ml-1"
          title="すべて完了/未完了に切り替え"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      {!hasItems && <div className="w-7" />}
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="タスクを追加... (Enterで確定)"
        className="flex-1 text-gray-700 placeholder-gray-400 text-base outline-none bg-transparent"
        autoFocus
      />
    </div>
  );
}
