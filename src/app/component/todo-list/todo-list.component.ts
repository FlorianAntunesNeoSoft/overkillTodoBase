import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() todos: Array<Todo>  | null = [];

  @Output() updatedTodo = new EventEmitter<Todo>();
  @Output() openAddTodoModal = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  changeStatutTodo(todo: Todo){
    const updatedTodo: Todo = {...todo, isClosed:!todo.isClosed};
    this.updatedTodo.emit(updatedTodo);
  }

  openAddModal(){
    this.openAddTodoModal.emit();
  }
}
