import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TaskListFilter, TaskList, TaskDetails, UpdateTaskForm} from './models';
import taskService from './service';
import {ToastAndroid} from 'react-native';

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface TaskState extends AsyncState {
  tasks: TaskList;
  task: TaskDetails;
}

const initialState: TaskState = {
  tasks: {
    todos: [],
    limit: 0,
    skip: 0,
    total: 0,
  },
  isLoading: false,
  isError: false,
  isSuccess: false,
  task: {
    completed: false,
    id: 0,
    todo: '',
  },
};

const revertTask = createAction('REVERT_TASK');

export const getTasks = createAsyncThunk('task-list', async () => {
  try {
    return await taskService.getTasks();
  } catch (error) {
    console.log('error', error);
  }
});

export const getTaskDetails = createAsyncThunk(
  'task-detail',
  async (id: number) => {
    try {
      return await taskService.getTaskDetails(id);
    } catch (error) {
      console.log('error', error);
    }
  },
);

export const createTask = createAsyncThunk(
  'create-task',
  async (task: UpdateTaskForm) => {
    try {
      await taskService.newTask(task);
      ToastAndroid.show('Success', ToastAndroid.LONG);
      return await taskService.getTasks();
    } catch (error) {
      console.log('error', error);
    }
  },
);

export const updateTask = createAsyncThunk(
  'update-task-from-list',
  async (task: TaskDetails) => {
    try {
      const {id, ...rest} = task;
      await taskService.updateTask(rest, task.id);
      ToastAndroid.show('Success', ToastAndroid.LONG);
      return await taskService.getTasks();
    } catch (error) {
      console.log('error', error);
    }
  },
);

export const deleteTask = createAsyncThunk(
  'delete-task',
  async (task: TaskDetails) => {
    try {
      await taskService.deletetask(task);
      ToastAndroid.show('Success', ToastAndroid.LONG);
      return await taskService.getTasks();
    } catch (error) {
      console.log('error', error);
    }
  },
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    reset: state => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
    resetTaskForm: state => {
      state.task = {todo: '', completed: false, id: 0};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTasks.pending, state => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.todos = action.payload?.data.todos || [];
        state.tasks.total = action.payload?.data.total || 0;
        state.tasks.limit = action.payload?.data.limit || 0;
        state.tasks.skip = action.payload?.data.skip || 0;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.tasks.todos = [];
        state.tasks.total = 0;
        state.tasks.limit = 0;
        state.tasks.skip = 0;
      })
      .addCase(updateTask.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getTaskDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTaskDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.task = action.payload?.data || state.task;
      })
      .addCase(getTaskDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.task = state.task;
      })
      .addCase(deleteTask.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(createTask.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default taskSlice.reducer;
