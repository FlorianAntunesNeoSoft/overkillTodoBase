import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { MockBuilder, MockedComponentFixture, MockRender, ngMocks } from 'ng-mocks';

import { ModalFormTodoComponent } from './modal-form-todo.component';

describe("ModalFormTodoComponent", () => {
  let component: ModalFormTodoComponent;
  let fixture: ComponentFixture<ModalFormTodoComponent>;

  ngMocks.faster();

  beforeAll(() => {
    return MockBuilder(ModalFormTodoComponent)
      .provide(FormBuilder)
  })

  beforeAll(()=>{
    fixture = MockRender(ModalFormTodoComponent);
    component = fixture.componentInstance;
  })

  it('should render content ignoring all dependencies', () => {
    expect(fixture).toBeDefined();
  });

  it('should return a todo with title and describe', () => {
    component.form.controls['title'].setValue('one title');
    component.form.controls['describe'].setValue('one describe');

    const fakeTodo = component.addTodo();

    expect(fakeTodo).toEqual({
      id: 0,
      isClosed : false,
      title : 'one title',
      describe: 'one describe'
    });

  });

  it('should invalid form', () => {
    component.form.controls['title'].setValue(null);
    expect(component.form.valid).toBeFalse();
  });

  it('should valid form', () => {
    component.form.controls['title'].setValue('test');
    expect(component.form.valid).toBeTrue();
  });
})
