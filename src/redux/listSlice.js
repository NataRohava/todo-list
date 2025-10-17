import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../axiosConfig";

const fetchGetTodos = createAsyncThunk(
  "list/fetchGetTodos",
  async (_, thunkAPI) => {
    try {
      const response = await config.get("/todos");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const fetchAddTask = createAsyncThunk(
  "list/fetchAddTask",
  async (title, thunkAPI) => {
    try {
      const response = await config.post("/todos", {
        title,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
const fetchDeleteTask = createAsyncThunk(
  "list/fetchDeleteTask",
  async (id, thunkAPI) => {
    try {
      const response = await config.delete(`/todos/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
const fetchCrossOutTask = createAsyncThunk(
  "list/fetchCrossOutTask",
  async ({ id, isCompleted }) => {
    try {
      const response = await config.patch(`/todos/${id}/isCompleted`, {
        isCompleted: !isCompleted,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
const fetchUpdateTask = createAsyncThunk(
  "list/fetchUpdateTask",
  async ({ id, title }, { rejectWithValue }) => {
    try {
      const response = await config.patch(`/todos/${id}`, { title });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    crossOut: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, isCompleted: !task.isCompleted }
          : task,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchAddTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(fetchDeleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(fetchCrossOutTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, isCompleted: !task.isCompleted }
            : task,
        );
      })
      .addCase(fetchUpdateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        );
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        },
      );
  },
});
export const { crossOut } = listSlice.actions;
export {
  fetchGetTodos,
  fetchAddTask,
  fetchDeleteTask,
  fetchCrossOutTask,
  fetchUpdateTask,
};
export default listSlice.reducer;
