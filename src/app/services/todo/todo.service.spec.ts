import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { Todo } from "src/app/models/todo";
import { environment } from "src/environments/environment";
import { TodoService } from "./todo.service";


describe('TodoService', () => {
  let service: TodoService;
  const httpMock = jasmine.createSpyObj<HttpClient>('httpClientSpy', ['get', 'post', 'put']);

  beforeAll(() => {
    service = new TodoService(httpMock);
  });

  beforeEach(() => {
    httpMock.get.calls.reset();
    httpMock.post.calls.reset();
    httpMock.put.calls.reset();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('loadAllTodo', () => {
    it('should call the httpClient with correct properties', () => {
      const todos : Todo[] = [{id:1, title:"toto", isClosed:true, describe:"test"}];
      httpMock.get.and.returnValue(of(todos));
      service.loadAll();
      expect(httpMock.get).toHaveBeenCalledOnceWith(`${environment.baseUrl}/todos`);
    });
  });

  describe('loadOneTodo', () => {
    it('should call the httpClient with correct properties', () => {
      const todo : Todo = {id:1, title:"toto", isClosed:true, describe:"test"};
      const idCalled : number = 1;
      httpMock.get.and.returnValue(of(todo));
      service.loadOne(idCalled);
      expect(httpMock.get).toHaveBeenCalledOnceWith(`${environment.baseUrl}/todos/` + idCalled);
    });
  });

  describe('updateTodo', () => {
    it('should call the httpClient with correct properties', () => {
      const todo : Todo = {id:1, title:"toto", isClosed:true, describe:"test"};
      const idUpdatedTodo : number = 1;
      httpMock.put.and.returnValue(of(todo));
      service.update(todo);
      expect(httpMock.put).toHaveBeenCalledOnceWith(`${environment.baseUrl}/todos/`+idUpdatedTodo,{id:1, title:"toto", isClosed:true, describe:"test"});
    });
  });

  describe('createTodo', () => {
    it('should call the httpClient with correct properties', () => {
      const todo : Todo = {id:1, title:"toto", isClosed:true, describe:"test"};
      httpMock.post.and.returnValue(of(todo));
      service.create(todo);
      expect(httpMock.post).toHaveBeenCalledOnceWith(`${environment.baseUrl}/todos/`,{id:1, title:"toto", isClosed:true, describe:"test"});
    });
  });
});
