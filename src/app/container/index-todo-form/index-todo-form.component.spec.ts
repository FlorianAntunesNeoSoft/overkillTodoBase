import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  DefaultRenderComponent,
  MockBuilder,
  MockedComponentFixture,
  MockRender,
  ngMocks,
} from 'ng-mocks';
import { of } from 'rxjs';
import { loadOneTodo } from 'src/app/store/actions';
import { getHasLoaded } from 'src/app/store/selectors';
import { IndexTodoFormComponent } from './index-todo-form.component';

describe('IndexTodoFormComponent', () => {
  let fixture: MockedComponentFixture<IndexTodoFormComponent>;
  let mockStore: MockStore;
  let component : DefaultRenderComponent<IndexTodoFormComponent>;

  ngMocks.faster();

  beforeEach(() => {
    return MockBuilder(IndexTodoFormComponent)
    .provide(
      provideMockStore({
        selectors: [{ selector: getHasLoaded, value: false }],
      }))
    .provide({
      provide : ActivatedRoute,
      useValue: {
        paramMap: of(convertToParamMap({ userId: 1 })),
      },
    });
  });

  beforeEach(() => {
    fixture = MockRender(IndexTodoFormComponent);
    mockStore = TestBed.inject(MockStore);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadOneTodo if store is not load', () => {
    const spyDispatch = spyOn(mockStore, 'dispatch');
    component.ngOnInit();
    expect(spyDispatch).toHaveBeenCalledWith(loadOneTodo({id : 0}));
  });

  it('should not dispatch loadOneTodo if store is load', () => {
    const spyDispatch = spyOn(mockStore, 'dispatch');
    getHasLoaded.setResult(true);
    mockStore.refreshState();
    component.ngOnInit();
    expect(spyDispatch).not.toHaveBeenCalled();
  });


});
