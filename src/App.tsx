// src/App.tsx
import { useAppSelector } from "./hooks";
import { selectCounts } from "./todos/selectors";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import AddTag from "./components/AddTag";
import TagList from "./components/TagList";

export default function App() {
  const counts = useAppSelector(selectCounts);

  return (
    <div className="container">
      <header>
        <h1>Redux Todos + Tags</h1>
        <p>
          Total: <strong>{counts.total}</strong> | Open:{" "}
          <strong>{counts.open}</strong> | Completed:{" "}
          <strong>{counts.completed}</strong>
        </p>
      </header>

      <section className="grid">
        <div className="card">
          <h2>Add Todo</h2>
          <AddTodo />
          <h2 style={{ marginTop: 16 }}>Todos</h2>
          <TodoList />
        </div>

        <div className="card">
          <h2>Tags</h2>
          <AddTag />
          <TagList />
        </div>
      </section>

      <footer>
        <small>React + Redux Toolkit • Vite • TypeScript</small>
      </footer>
    </div>
  );
}
