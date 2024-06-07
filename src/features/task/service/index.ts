import axios from '../../../config/axios';
import {TaskList, TaskDetails, UpdateTaskForm} from '../models';

const getTasks = async () => {
  const response = await axios.get<TaskList>(`/`);
  return response;
};

const getTaskDetails = async (id: number) => {
  const response = await axios.get<TaskDetails>(`/${id}`);
  return response;
};

const newTask = async (task: UpdateTaskForm) => {
  const response = await axios.post<TaskDetails>(`/`, task);
  return response;
};

const updateTask = async (task: UpdateTaskForm, id: number) => {
  const response = await axios.put<TaskList>(`/${id}`, task);
  return response;
};

const deletetask = async (task: TaskDetails) => {
  const response = await axios.delete<TaskList>(`/${task.id}`);
  return response;
};

const taskService = {
  getTasks,
  updateTask,
  getTaskDetails,
  deletetask,
  newTask,
};

export default taskService;
