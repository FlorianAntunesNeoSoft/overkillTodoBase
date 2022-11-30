import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createTodo,
  createTodoFailed,
  createTodoSuccess,
  loadAllTodos,
  loadAllTodosFailed,
  loadAllTodosSuccess,
  loadOneTodo,
  loadOneTodoFailed,
  loadOneTodoSuccess,
  updateTodo,
  updateTodoFailed,
  updateTodoSuccess,
} from './actions';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { TodoService } from '../services/todo/todo.service';

@Injectable()
export class Effects {

  // Load
  loadAllTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllTodos),
      mergeMap(() =>
        this.todoService.loadAll().pipe(
          map((todos) => loadAllTodosSuccess({ todos })),
          catchError(() => [loadAllTodosFailed()])
        )
      )
    )
  );

  loadOneTodo$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadOneTodo),
    mergeMap((action) =>
      this.todoService.loadOne(action.id).pipe(
        map((todo) => loadOneTodoSuccess({ todo : todo})),
        catchError(() => [loadOneTodoFailed()])
      )
    )
  )
);



  // UPDATE
  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodo),
      switchMap((action) =>
        this.todoService.update(action.selectedTodo).pipe(
          map((todo) =>updateTodoSuccess({selectedTodo : todo})),
          catchError((e) =>  [updateTodoFailed()]
          )
        )
      )
    )
  );


    // Create
    createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTodo),
      switchMap((action) =>
        this.todoService.create(action.todo).pipe(
          map((todo) =>createTodoSuccess({todo : todo})),
          catchError((e) => {
            console.log(e);
            return [createTodoFailed()]
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
