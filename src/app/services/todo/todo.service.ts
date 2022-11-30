import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from '../../models/todo';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  loadAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.baseUrl}/todos`);
  }

  loadOne(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${environment.baseUrl}/todos/`+ id);
  }

  update(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${environment.baseUrl}/todos/` + todo.id, todo);
  }

  create(todo: Todo): Observable<Todo>{
    return this.http.post<Todo>(`${environment.baseUrl}/todos/`, todo);
  }
}
