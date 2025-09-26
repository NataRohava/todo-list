import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    { id: crypto.randomUUID(), title: "Купить молоко", isCompleted: false },
  ],
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: crypto.randomUUID(),
        title: action.payload,
        isCompleted: false,
      });
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    crossOut: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, isCompleted: !task.isCompleted }
          : task,
      );
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map((item) =>
        item.id === action.payload.id
          ? { ...item, title: action.payload.value }
          : item,
      );
    },
  },
});

export const { addTask, deleteTask, crossOut, updateTask } = listSlice.actions;
export default listSlice.reducer;
