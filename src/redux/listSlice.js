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
  async ({ id, isCompleted }, thunkAPI) => {
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
      const task = state.tasks.find((item) => item.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
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

        const index = state.tasks.findIndex(
          (task) => task.id === action.payload,
        );
        if (index !== -1) {
          state.tasks.splice(index, 1);
        }
      })
      .addCase(fetchCrossOutTask.fulfilled, (state, action) => {
        state.loading = false;

        const task = state.tasks.find((item) => item.id === action.payload.id);
        if (task) {
          task.isCompleted = !task.isCompleted;
        }
      })
      .addCase(fetchUpdateTask.fulfilled, (state, action) => {
        state.loading = false;

        const task = state.tasks.find((item) => item.id === action.payload.id);
        if (task) {
          task.title = action.payload.title;
        }
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
  selectors: {
    selectTasks: (state) => state.tasks,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
  },
});
export const { crossOut } = listSlice.actions;
export const { selectTasks, selectLoading, selectError } = listSlice.selectors;
export {
  fetchGetTodos,
  fetchAddTask,
  fetchDeleteTask,
  fetchCrossOutTask,
  fetchUpdateTask,
};
export default listSlice.reducer;
