import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo';


// Load all todos
export const loadAllTodos        = createAction('[Todos] Load all todos');
export const loadAllTodosSuccess = createAction('[Todos] Load all todos success',props<{ todos: Todo[] }>());
export const loadAllTodosFailed  = createAction('[Todos] Load all todos failed');

// Load one todo
export const loadOneTodo        = createAction('[Todos] Load one todo',props<{ id: number }>());
export const loadOneTodoSuccess = createAction('[Todos] Load one todo success',props<{ todo: Todo }>());
export const loadOneTodoFailed  = createAction('[Todos] Load one todo failed');

// Change statuts TODO
export const updateTodo         = createAction('[Todos] Update todo', props<{selectedTodo: Todo}>());
export const updateTodoSuccess  = createAction('[Todos] Update todo success', props<{selectedTodo: Todo}>());
export const updateTodoFailed   = createAction('[Todos] Update todo failed');

// Create todo
export const createTodo        = createAction('[Todos] Create todo',props<{ todo: Todo }>());
export const createTodoSuccess = createAction('[Todos] Create todo success',props<{ todo: Todo }>());
export const createTodoFailed  = createAction('[Todos] Create todo failed');


