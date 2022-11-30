import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemoizedSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isEmpty, take } from 'rxjs/operators';
import { Todo } from 'src/app/models/todo';
import { loadOneTodo } from 'src/app/store/actions';
import { getHasLoaded, selectOneTodoById } from 'src/app/store/selectors';

@Component({
  selector: 'app-index-todo-form',
  templateUrl: './index-todo-form.component.html',
  styleUrls: ['./index-todo-form.component.scss'],
})
export class IndexTodoFormComponent implements OnInit {
  constructor(private route: ActivatedRoute, private store: Store) {}

  // Observable
  todo$!: Observable<Todo>;


  todoId: number | null = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.todoId = +paramMap.get('id')!;
    });

    this.store.select(getHasLoaded).pipe(
    take(1))
    .subscribe((hasLoaded: boolean)  => {
      if (!hasLoaded) this.store.dispatch(loadOneTodo({id : this.todoId!}));
    });

    this.todo$ = this.store.select(selectOneTodoById(this.todoId!));
  }
}
