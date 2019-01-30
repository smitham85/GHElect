import Axios from 'axios';

//Action Types
export const TASKS = 'TASKS';
export const TASK = 'TASK';

//Action Creators
export const gotTasks = tasks => ({
  type: TASKS,
  tasks,
});

export const gotTask = task => ({
  type: TASK,
  task,
});

//Thunk Creators
export const fetchTasks = () => {
  return async dispatch => {
    const response = await Axios.get('http://localhost:8082/api/tasks');
    const listOfTasks = response.data;
    const action = gotTasks(listOfTasks);
    dispatch(action);
  };
};

export const fetchATask = id => {
  return async dispatch => {
    const response = await Axios.get('http://localhost:8082/api/tasks/' + id);
    const singleTask = response.data;
    const action = gotTask(singleTask);
    dispatch(action);
  };
};

const initialState = {
  taskslist: [],
  oneTask: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKS:
      return { ...state, taskslist: action.tasks };
    case TASK:
      return { ...state, oneTask: action.task };
    default:
      return state;
  }
};

export default taskReducer;
