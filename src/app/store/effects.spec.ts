import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Effects } from './effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { todosReducer } from './reducer';
import { TodoService } from '../services/todo/todo.service';
import { cold, hot } from 'jasmine-marbles';
import {createTodo, createTodoFailed, createTodoSuccess, loadAllTodos, loadAllTodosFailed, loadAllTodosSuccess, loadOneTodo, loadOneTodoFailed, loadOneTodoSuccess, updateTodo, updateTodoFailed, updateTodoSuccess} from './actions';
import { Todo } from '../models/todo';

describe('Effects', () => {
  let effects: Effects;
  let actions: Observable<Actions>;
  const todoService = jasmine.createSpyObj<TodoService>('TodoService', ['loadAll', 'loadOne', 'update', 'create']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ todosStore: todosReducer })],
      providers: [
        Effects,
        provideMockActions(() => actions),
        {
          provide: TodoService,
          useValue: todoService,
        },
      ],
    });

    effects = TestBed.inject(Effects);
  });

  describe('loadAllTodos$', () => {
    it('should dispatch loadTodosSuccess action when todoService.loadAll return a result', () => {
      const mockedTodos: Todo[] = [{id: 1, title: 'aTitle', isClosed: true }];
      todoService.loadAll.and.returnValue(of(mockedTodos));

      actions = hot('-a-', {
        a: loadAllTodos(),
      });
      const expected = cold('-b-', {
        b: loadAllTodosSuccess({ todos: mockedTodos }),
      });

      expect(effects.loadAllTodos$).toBeObservable(expected);
    });

    it('should dispatch loadTodosFailed action when todoService.loadAll fails', () => {
      todoService.loadAll.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: loadAllTodos(),
      });
      const expected = cold('-b-', {
        b: loadAllTodosFailed(),
      });

      expect(effects.loadAllTodos$).toBeObservable(expected);
    });
  });

  describe('loadOneTodos$', () => {
    it('should dispatch loadOneTodosSuccess action when todoService.loadOne return a result', () => {
      const mockedTodo: Todo = {id: 1, title: 'aTitle', isClosed: true };
      todoService.loadOne.and.returnValue(of(mockedTodo));

      actions = hot('-a-', {
        a: loadOneTodo({id : 1}),
      });
      const expected = cold('-b-', {
        b: loadOneTodoSuccess({ todo: mockedTodo }),
      });

      expect(effects.loadOneTodo$).toBeObservable(expected);
    });

    it('should dispatch loadTodosFailed action when todoService.loadOne fails', () => {
      todoService.loadOne.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: loadOneTodo({id : 1}),
      });
      const expected = cold('-b-', {
        b: loadOneTodoFailed(),
      });

      expect(effects.loadOneTodo$).toBeObservable(expected);
    });
  });

  describe('updateTodo$', () => {
    it('should dispatch updateTodoSuccess action when todoService.update return a updated todo', () => {
      const mockedTodo: Todo = {id: 1, title: 'aTitle', isClosed: true };
      todoService.update.and.returnValue(of(mockedTodo));

      actions = hot('-a-', {
        a: updateTodo({selectedTodo : mockedTodo}),
      });
      const expected = cold('-b-', {
        b: updateTodoSuccess({ selectedTodo : mockedTodo }),
      });

      expect(effects.updateTodo$).toBeObservable(expected);
    });

    it('should dispatch updatTodosFailed action when todoService.update fails', () => {
      const mockedTodo: Todo = {id: 1, title: 'aTitle', isClosed: true };
      todoService.update.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: updateTodo({selectedTodo : mockedTodo}),
      });
      const expected = cold('-b-', {
        b: updateTodoFailed(),
      });

      expect(effects.updateTodo$).toBeObservable(expected);
    });
  });

  describe('createTodo$', () => {
    it('should dispatch createTodoSuccess action when todoService.create return a created todo', () => {
      const mockedTodo: Todo = {id: 0, title: 'aTitle', isClosed: true };
      todoService.create.and.returnValue(of(mockedTodo));

      actions = hot('-a-', {
        a: createTodo({todo : mockedTodo}),
      });
      const expected = cold('-b-', {
        b: createTodoSuccess({ todo : mockedTodo }),
      });

      expect(effects.createTodo$).toBeObservable(expected);
    });

    it('should dispatch createTodoFailed action when todoService.create fails', () => {
      const mockedTodo: Todo = {id: 1, title: 'aTitle', isClosed: true };
      todoService.create.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: createTodo({todo : mockedTodo}),
      });
      const expected = cold('-b-', {
        b: createTodoFailed(),
      });

      expect(effects.createTodo$).toBeObservable(expected);
    });
  });
});
