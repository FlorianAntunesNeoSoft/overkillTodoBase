import {createFeatureSelector, createSelector} from '@ngrx/store';
import { Todo } from '../models/todo';
import {featureKey, State} from './reducer';

export const getState = createFeatureSelector<State>(featureKey);

export const selectTodos = createSelector(
  getState,
  (state: State) => state.todos,
);

export const selectTodosSortByStatus = createSelector(getState, (state: State) => {
  let sortArray : Todo[] = [...state.todos];
  return sortArray.sort((a, b) => Number(a.isClosed) - Number(b.isClosed));
})

export const selectOneTodoById = (id: number) => createSelector(getState, (state: State) => {
  return state.todos.find(todo => todo.id === id)!
});

export const getHasLoaded = createSelector(getState, (state: State) => {
  return state.hasLoaded;
})
