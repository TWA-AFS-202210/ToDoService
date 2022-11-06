import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  constructor(private http: HttpClient) { }

  create(todoItem: ToDoItem): Observable<ToDoItem> {
    return this.http.post<ToDoItem>('https://635fc244ca0fe3c21aa3d012.mockapi.io/api/todos', todoItem);
  }

  findById(id: number): Observable<ToDoItem> {
    return this.http.get<ToDoItem>(`https://635fc244ca0fe3c21aa3d012.mockapi.io/api/todos/${id}`);
  }

  update(todoItem: ToDoItem): Observable<ToDoItem> {
    return this.http.put<ToDoItem>(`https://635fc244ca0fe3c21aa3d012.mockapi.io/api/todos/${todoItem.id}`, todoItem);
  }

  delete(id: number): Observable<ToDoItem> {
    return this.http.delete<ToDoItem>(`https://635fc244ca0fe3c21aa3d012.mockapi.io/api/todos/${id}`);
  }
}
