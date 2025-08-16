// src/components/TagList.tsx
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectAllTags } from "../todos/selectors";
import { deleteTag } from "../todos/todosSlice";

export default function TagList() {
  const tags = useAppSelector(selectAllTags);
  const dispatch = useAppDispatch();

  if (tags.length === 0) return <p>No tags yet.</p>;

  return (
    <ul className="list">
      {tags.map((t) => (
        <li key={t.id} className="chip-row">
          <span className="chip">{t.name}</span>
          <button className="danger" onClick={() => dispatch(deleteTag(t.id))}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
