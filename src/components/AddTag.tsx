// src/components/AddTag.tsx
import type { FormEvent } from "react";
import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { addTag } from "../todos/todosSlice";

export default function AddTag() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    dispatch(addTag(trimmed));
    setName("");
  };

  return (
    <form onSubmit={onSubmit} className="row">
      <input
        placeholder="Create a tag (e.g. urgent, home)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Tag</button>
    </form>
  );
}
