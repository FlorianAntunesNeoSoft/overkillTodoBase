import { Todo } from '../models/todo';
import { createReducer, on } from '@ngrx/store';
import {
  createTodo,
  createTodoSuccess,
  loadAllTodosSuccess,
  loadOneTodo,
  loadOneTodoSuccess,
  updateTodoSuccess,
} from './actions';

export const featureKey = 'todosStore';

export interface State {
  hasLoaded: boolean;
  todos: Array<Todo>;
}

export const initialState: State = {
  hasLoaded: false,
  todos: [],
};

export const todosReducer = createReducer(
  initialState,
  on(loadAllTodosSuccess, (state, { todos }) => ({
    ...state,
    hasLoaded: true,
    todos: todos,
  })),
  on(loadOneTodoSuccess, (state, { todo }) => ({
    ...state,
    hasLoaded: true,
    todos: [...state.todos, todo],
  })),
  on(updateTodoSuccess, (state, { selectedTodo: selectedTodoUpdate }) => ({
    ...state,
    todos: updateTodo(state, selectedTodoUpdate),
  })),
  on(createTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: [todo, ...state.todos],
  }))
);

function updateTodo(state: State, selectedTodo: Todo): Todo[] {
  let updatedTodos: Todo[] = [...state.todos];
  state.todos.map((todo, index) => {
    if (todo.id === selectedTodo.id) {
      updatedTodos.splice(index, 1)[0];
      selectedTodo.isClosed
        ? (updatedTodos = [...updatedTodos, selectedTodo])
        : (updatedTodos = [selectedTodo, ...updatedTodos]);
    }
  });
  return updatedTodos;
}
