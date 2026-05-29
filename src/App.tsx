import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { TodoFilter } from './components/TodoFilter';
import './index.css';

export default function App() {
  const {
    todos,
    allTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-center text-4xl font-light tracking-widest text-indigo-300 mb-8 select-none">
          TODO
        </h1>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <TodoInput
            onAdd={addTodo}
            onToggleAll={toggleAll}
            hasItems={allTodos.length > 0}
          />

          {todos.length === 0 ? (
            <div className="py-16 text-center text-gray-300 text-sm select-none">
              {allTodos.length === 0 ? 'タスクを追加してみましょう' : 'タスクがありません'}
            </div>
          ) : (
            <ul>
              {todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))}
            </ul>
          )}

          {allTodos.length > 0 && (
            <TodoFilter
              filter={filter}
              onFilter={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
              onClearCompleted={clearCompleted}
            />
          )}
        </div>

        <p className="mt-6 text-center text-xs text-gray-300 select-none">
          ダブルクリックで編集 · Enter で確定 · Esc でキャンセル
        </p>
      </div>
    </div>
  );
}
