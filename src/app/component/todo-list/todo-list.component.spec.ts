import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { Todo } from 'src/app/models/todo';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  ngMocks.faster()

  beforeAll(() => {
    return MockBuilder(TodoListComponent)
  });

  beforeAll(()=>{
    fixture = MockRender(TodoListComponent);
    component = fixture.componentInstance;
  })

  it('should render content ignoring all dependencies', () => {
    expect(fixture).toBeDefined();
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change statut of todo, true to false', () => {
    const todo : Todo = {id:1, title:'toto', isClosed: true, describe:'blablabla'}
    spyOn(component.updatedTodo, 'emit');
    component.changeStatutTodo(todo);
    fixture.detectChanges();
    expect(component.updatedTodo.emit).toHaveBeenCalledWith({id:1, title:'toto', isClosed: false, describe:'blablabla'});
  });

  it('should change statut of todo, false to true', () => {
    const todo : Todo = {id:1, title:'toto', isClosed: false, describe:'blablabla'}
    spyOn(component.updatedTodo, 'emit');
    component.changeStatutTodo(todo);
    fixture.detectChanges();
    expect(component.updatedTodo.emit).toHaveBeenCalledWith({id:1, title:'toto', isClosed: true, describe:'blablabla'});
  });

  it('should open add modal', () => {
    spyOn(component.openAddTodoModal, 'emit');
    component.openAddModal();
    fixture.detectChanges();
    expect(component.openAddTodoModal.emit).toHaveBeenCalled();
  });


});
