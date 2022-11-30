import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';

import { TodoDetailsComponent } from './todo-details.component';

describe('TodoDetailsComponent', () => {
  let component: TodoDetailsComponent;
  let fixture: ComponentFixture<TodoDetailsComponent>;

  ngMocks.faster()

  beforeAll(() => {
    return MockBuilder(TodoDetailsComponent)
  })

  it('should render content ignoring all dependencies', () => {
    fixture = MockRender(TodoDetailsComponent);
    component = fixture.componentInstance;
    expect(fixture).toBeDefined();
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    fixture = MockRender(TodoDetailsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
