import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ModalFormTodoComponent } from 'src/app/component/modal-form-todo/modal-form-todo.component';
import { Todo } from 'src/app/models/todo';
import { updateTodo, loadAllTodos, createTodo } from 'src/app/store/actions';
import { selectTodosSortByStatus } from 'src/app/store/selectors';

@Component({
  selector: 'app-index-todo-list',
  templateUrl: './index-todo-list.container.html',
  styleUrls: ['./index-todo-list.container.scss'],
})
export class IndexTodoListComponent implements OnInit {
  todos$: Observable<Array<Todo>> | undefined;

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(loadAllTodos());
    this.todos$ = this.store.select(selectTodosSortByStatus);
  }

  updatedTodo($event: Todo) {
    this.store.dispatch(updateTodo({ selectedTodo: $event }));
  }

  openAddModal() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50%';
    dialogConfig.width = '30%';

    const dialogRef = this.dialog.open(ModalFormTodoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: Todo) => {
      if (result) {
        this.store.dispatch(createTodo({ todo: result }));
      }
    });
  }
}
