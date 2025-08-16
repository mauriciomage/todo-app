// src/todos/todosSlice.ts
import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Tag = { id: string; name: string };
export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  tags: string[];
};

type TodosState = {
  items: Record<string, Todo>;
  order: string[];
  tags: Record<string, Tag>;
};

const initialState: TodosState = {
  items: {},
  order: [],
  tags: {},
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action: PayloadAction<Todo>) {
        const todo = action.payload;
        state.items[todo.id] = todo;
        state.order.unshift(todo.id);
      },
      prepare(text: string) {
        return {
          payload: { id: nanoid(), text, completed: false, tags: [] } as Todo,
        };
      },
    },
    editTodoText(
      state,
      action: PayloadAction<{ todoId: string; text: string }>
    ) {
      const { todoId, text } = action.payload;
      const todo = state.items[todoId];
      if (todo) todo.text = text;
    },
    toggleTodo(state, action: PayloadAction<string>) {
      const id = action.payload;
      const t = state.items[id];
      if (t) t.completed = !t.completed;
    },
    deleteTodo(state, action: PayloadAction<string>) {
      const id = action.payload;
      delete state.items[id];
      state.order = state.order.filter((x) => x !== id);
    },

    addTag: {
      reducer(state, action: PayloadAction<Tag>) {
        state.tags[action.payload.id] = action.payload;
      },
      prepare(name: string) {
        return { payload: { id: nanoid(), name } as Tag };
      },
    },
    deleteTag(state, action: PayloadAction<string>) {
      const tagId = action.payload;
      delete state.tags[tagId];
      // Remove tag from all todos
      Object.values(state.items).forEach((todo) => {
        todo.tags = todo.tags.filter((t) => t !== tagId);
      });
    },
    addTagToTodo(
      state,
      action: PayloadAction<{ todoId: string; tagId: string }>
    ) {
      const { todoId, tagId } = action.payload;
      const todo = state.items[todoId];
      if (todo && state.tags[tagId] && !todo.tags.includes(tagId)) {
        todo.tags.push(tagId);
      }
    },
    removeTagFromTodo(
      state,
      action: PayloadAction<{ todoId: string; tagId: string }>
    ) {
      const { todoId, tagId } = action.payload;
      const todo = state.items[todoId];
      if (todo) {
        todo.tags = todo.tags.filter((t) => t !== tagId);
      }
    },
  },
});

export const {
  addTodo,
  editTodoText,
  toggleTodo,
  deleteTodo,
  addTag,
  deleteTag,
  addTagToTodo,
  removeTagFromTodo,
} = todosSlice.actions;

export default todosSlice.reducer;
