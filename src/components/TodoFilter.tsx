import type { Filter } from '../types';

interface Props {
  filter: Filter;
  onFilter: (f: Filter) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'active', label: '未完了' },
  { value: 'completed', label: '完了済み' },
];

export function TodoFilter({ filter, onFilter, activeCount, completedCount, onClearCompleted }: Props) {
  return (
    <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-400">
      <span className="min-w-[80px]">
        残り <strong className="text-gray-600">{activeCount}</strong> 件
      </span>

      <div className="flex gap-1">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => onFilter(f.value)}
            className={`px-3 py-1 rounded transition-all duration-150 ${
              filter === f.value
                ? 'border border-indigo-300 text-indigo-600 font-medium'
                : 'hover:text-gray-600'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="min-w-[80px] text-right">
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="hover:text-red-400 transition-colors"
          >
            完了を削除
          </button>
        )}
      </div>
    </div>
  );
}
