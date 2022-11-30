import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-modal-form-todo',
  templateUrl: './modal-form-todo.component.html',
  styleUrls: ['./modal-form-todo.component.scss'],
})
export class ModalFormTodoComponent implements OnInit {

  // Form to add todo
  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    describe: ['']
  });

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {}

  public addTodo(): Todo {
    return {
      id: 0,
      isClosed : false,
      title : this.form.get('title')?.value,
      describe: this.form.get('describe')?.value
    }
  }
}
