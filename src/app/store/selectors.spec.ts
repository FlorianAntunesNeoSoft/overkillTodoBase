import {State} from './reducer';
import {getHasLoaded, selectOneTodoById, selectTodos, selectTodosSortByStatus} from './selectors';

describe('Selectors', () => {
  const initialState: State = {
    hasLoaded: false,
   todos: [
     {id: 1, title: 'todo1Title', isClosed: true},
     {id: 2, title: 'todo2Title', isClosed: false},
   ]
  };

  it('should select todos list', () => {
    const result = selectTodos.projector(initialState);
    expect(result).toEqual(initialState.todos);
  });

  it('should select todo in list by id', () => {
    const result = selectOneTodoById(1).projector(initialState);
    expect(result).toEqual({id: 1, title: 'todo1Title', isClosed: true});
  });


  it('should select todo in list by status', () => {
    const result = selectTodosSortByStatus.projector(initialState);
    expect(result).toEqual([{id: 2, title: 'todo2Title', isClosed: false},{id: 1, title: 'todo1Title', isClosed: true}]);
  });


  it('should select if the store has been loaded', () => {
    const result = getHasLoaded.projector(initialState);
    expect(result).toEqual(initialState.hasLoaded);
  });
});
