import * as fromReducer from './reducer';
import { State } from './reducer';
import { createTodoSuccess, loadAllTodosSuccess, loadOneTodoSuccess, updateTodoSuccess } from './actions';
import { Todo } from '../models/todo';

describe('Reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('load Todo(s) action', () => {
    it('should retrieve all todos and update the state', () => {
      const { initialState } = fromReducer;
      const newState: State = {hasLoaded: true, todos: [{ id:1, title: 'aTitle', isClosed: false, describe:"" }] };
      const action = loadAllTodosSuccess({
        todos: [...newState.todos],
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
    it('should retrieve one todo and update the state', () => {
      const { initialState } = fromReducer;
      const newState: State = {hasLoaded: true, todos: [{ id:1, title: 'aTitle', isClosed: false, describe:"" }] };
      const action = loadOneTodoSuccess({
        todo: newState.todos[0],
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('Update Todo action', () => {
    it('should update the state and move closed todo at the end', () => {
      const initialState : State  = {
        hasLoaded: false,
        todos: [
                { id:1, title: 'aTitle', isClosed: false, describe:"" },
                { id:2, title: 'bTitle', isClosed: false, describe:"" },
                { id:3, title: 'cTitle', isClosed: true, describe:"" }
              ]
      };
      const FinalState : State  = {
        hasLoaded: false,
        todos: [
          { id:1, title: 'aTitle', isClosed: false, describe:"" },
          { id:3, title: 'cTitle', isClosed: true, describe:"" },
          { id:2, title: 'bTitle', isClosed: true, describe:"" }
        ]
      };
      const todoUpdated : Todo = { id:2, title: 'bTitle', isClosed: true, describe:"" }

      const action = updateTodoSuccess({
        selectedTodo : todoUpdated
      });

      const state = fromReducer.todosReducer(initialState, action);

      console.log(state);

      expect(state).toEqual(FinalState);
      expect(state).not.toBe(FinalState);
    });
    it('should update the state and move open todo at the top', () => {
      const initialState : State  = {
        hasLoaded: false,
        todos: [
                { id:1, title: 'aTitle', isClosed: false, describe:"" },
                { id:2, title: 'bTitle', isClosed: false, describe:"" },
                { id:3, title: 'cTitle', isClosed: true, describe:"" }
              ]
      };
      const FinalState : State  = {
        hasLoaded: false,
        todos: [
          { id:3, title: 'cTitle', isClosed: false, describe:"" },
          { id:1, title: 'aTitle', isClosed: false, describe:"" },
          { id:2, title: 'bTitle', isClosed: false, describe:"" }
        ]
      };
      const todoUpdated : Todo = { id:3, title: 'cTitle', isClosed: false, describe:"" }

      const action = updateTodoSuccess({
        selectedTodo : todoUpdated
      });

      const state = fromReducer.todosReducer(initialState, action);

      console.log(state);

      expect(state).toEqual(FinalState);
      expect(state).not.toBe(FinalState);
    });
  });


  describe('Create Todo action', () => {
    it('should create todo in the state and move todo at the top', () => {
      const initialState : State  = {
        hasLoaded: false,
        todos: [
                { id:1, title: 'aTitle', isClosed: false, describe:"" },
                { id:2, title: 'bTitle', isClosed: false, describe:"" },
                { id:3, title: 'cTitle', isClosed: true, describe:"" }
              ]
      };
      const FinalState : State  = {
        hasLoaded: false,
        todos: [
          { id:4, title: 'dTitle', isClosed: false, describe:"" },
          { id:1, title: 'aTitle', isClosed: false, describe:"" },
          { id:2, title: 'bTitle', isClosed: false, describe:"" },
          { id:3, title: 'cTitle', isClosed: true, describe:"" },
        ]
      };
      const todo : Todo = { id:4, title: 'dTitle', isClosed: false, describe:"" }

      const action = createTodoSuccess({
        todo : todo
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(FinalState);
      expect(state).not.toBe(FinalState);
    });
  });
});
