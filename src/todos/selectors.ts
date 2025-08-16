// src/todos/selectors.ts
import { createSelector } from "reselect";
import type { RootState } from "../store";
import type { Todo } from "../todos/todosSlice";

export const selectTodosState = (state: RootState) => state.todos;

export const selectAllTodos = createSelector(selectTodosState, (s) =>
  s.order.map((id) => s.items[id])
);

export const selectAllTags = createSelector(selectTodosState, (s) =>
  Object.values(s.tags)
);

export const selectCounts = createSelector(selectAllTodos, (todos: Todo[]) => ({
  total: todos.length,
  completed: todos.filter((t) => t.completed).length,
  open: todos.filter((t) => !t.completed).length,
}));

export const makeSelectTodosByTag = (tagId: string) =>
  createSelector(selectAllTodos, (todos: Todo[]) =>
    todos.filter((t) => t.tags.includes(tagId))
  );
