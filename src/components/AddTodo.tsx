// src/components/AddTodo.tsx
import type { FormEvent } from "react";
import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { addTodo } from "../todos/todosSlice";

export default function AddTodo() {
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    dispatch(addTodo(trimmed));
    setText("");
  };

  return (
    <form onSubmit={onSubmit} className="row">
      <input
        placeholder="Add a new task…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
