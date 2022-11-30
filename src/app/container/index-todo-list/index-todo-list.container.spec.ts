import { Overlay, ScrollStrategyOptions } from "@angular/cdk/overlay";
import { TestBed } from "@angular/core/testing";
import { MatDialog, MAT_DIALOG_SCROLL_STRATEGY } from "@angular/material/dialog";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { DefaultRenderComponent, MockBuilder, MockedComponentFixture, MockRender, ngMocks } from "ng-mocks";
import { EMPTY, of } from "rxjs";
import { Todo } from "src/app/models/todo";
import { loadAllTodos, updateTodo } from "src/app/store/actions";
import { selectTodos, selectTodosSortByStatus } from "src/app/store/selectors";
import { IndexTodoListComponent } from "./index-todo-list.container";


describe('IndexTodoListComponent', () => {
  let component: DefaultRenderComponent<IndexTodoListComponent>;
  let fixture: MockedComponentFixture<IndexTodoListComponent>;
  let mockStore: MockStore;
  let mockDialog : jasmine.SpyObj<MatDialog>;

  ngMocks.faster();

  beforeAll(() => {
    return MockBuilder(IndexTodoListComponent).provide(
      provideMockStore({
        selectors: [
          { selector: selectTodosSortByStatus, value: [{
            "id": 1,
            "isClosed": true,
            "title": "Ajouter 1 todo",
            "describe": ""
          },
          {
            "id": 2,
            "isClosed": true,
            "title": "Pouvoir le fermer",
            "describe": ""
          }]}
        ],
      }))
      .provide([Overlay])
      .provide({provide: MatDialog})

  });
  beforeAll(() => {
    fixture = MockRender(IndexTodoListComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    mockDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadAllTodos', () => {
    const spyDispatch = spyOn(mockStore, 'dispatch');
    component.ngOnInit();
    expect(spyDispatch).toHaveBeenCalledWith(loadAllTodos());
  });

  it('should dispatch updateTodo when function updatedTodo is calling', () => {
    const spyDispatch = spyOn(mockStore, 'dispatch');
    const todo : Todo = {"id": 1,"isClosed": true,"title": "Ajouter 1 todo","describe": ""}
    component.updatedTodo(todo);
    expect(spyDispatch).toHaveBeenCalledWith(updateTodo({selectedTodo : todo}));
  });

  it('should be open dialog with no result', () => {
    const spyDispatch = spyOn(mockStore, 'dispatch');
    const openDialogSpy = spyOn(component.dialog, 'open')
        .and
        .returnValue({afterClosed: () => of(false)} as any);

    component.openAddModal();
    expect(openDialogSpy).toHaveBeenCalled();
    expect(spyDispatch).not.toHaveBeenCalled();
  });

  it('should be open dialog with one result', () => {
    const spyDispatch = spyOn(mockStore, 'dispatch');
    const openDialogSpy = spyOn(component.dialog, 'open')
        .and
        .returnValue({afterClosed: () => of(true)} as any);

    component.openAddModal();
    expect(openDialogSpy).toHaveBeenCalled();
    expect(spyDispatch).toHaveBeenCalled();
  });

});
