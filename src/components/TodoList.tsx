// src/components/TodoList.tsx
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectAllTags, selectAllTodos } from "../todos/selectors";
import {
  addTagToTodo,
  deleteTodo,
  removeTagFromTodo,
  toggleTodo,
} from "../todos/todosSlice";

export default function TodoList() {
  const todos = useAppSelector(selectAllTodos);
  const tags = useAppSelector(selectAllTags);
  const dispatch = useAppDispatch();

  if (todos.length === 0) return <p>No todos yet. Add one above.</p>;

  return (
    <ul className="list">
      {todos.map((t) => (
        <li key={t.id} className="todo">
          <div className="row gap">
            <label className="row gap">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => dispatch(toggleTodo(t.id))}
              />
              <span className={t.completed ? "done" : ""}>{t.text}</span>
            </label>

            <button
              className="danger"
              onClick={() => dispatch(deleteTodo(t.id))}
            >
              Delete
            </button>
          </div>

          <div className="row gap wrap" style={{ marginTop: 8 }}>
            {t.tags.map((tagId) => {
              const tag = tags.find((x) => x.id === tagId);
              if (!tag) return null;
              return (
                <span key={tagId} className="chip">
                  {tag.name}{" "}
                  <button
                    className="chip-x"
                    title="Remove tag"
                    onClick={() =>
                      dispatch(removeTagFromTodo({ todoId: t.id, tagId }))
                    }
                  >
                    ×
                  </button>
                </span>
              );
            })}

            <TagPicker
              todoId={t.id}
              onPick={(tagId) =>
                dispatch(addTagToTodo({ todoId: t.id, tagId }))
              }
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function TagPicker({
  todoId,
  onPick,
}: {
  todoId: string;
  onPick: (tagId: string) => void;
}) {
  const tags = useAppSelector(selectAllTags);
  const [sel, setSel] = useState("");

  if (tags.length === 0) return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (sel) onPick(sel);
        setSel("");
      }}
      className="row"
    >
      <select value={sel} onChange={(e) => setSel(e.target.value)}>
        <option value="">+ Add a tag…</option>
        {tags.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      <button type="submit">Attach</button>
    </form>
  );
}
