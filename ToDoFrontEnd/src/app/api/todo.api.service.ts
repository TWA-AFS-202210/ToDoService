import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';
import { HttpHeaders } from '@angular/common/http';


const BASE_URL = 'https://localhost:5001/ToDos'; 
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  constructor(private http: HttpClient) { }

  create(todoItem: ToDoItem): Observable<ToDoItem> {
    return this.http.post<ToDoItem>(BASE_URL, todoItem, httpOptions);
  }

  findById(id: number): Observable<ToDoItem> {
    return this.http.get<ToDoItem>(`${BASE_URL}/${id}`, httpOptions);
  }

  update(todoItem: ToDoItem): Observable<ToDoItem> {
    return this.http.put<ToDoItem>(`${BASE_URL}/${todoItem.id}`, todoItem);
  }

  delete(id: number): Observable<ToDoItem> {
    return this.http.delete<ToDoItem>(`${BASE_URL}/${id}`);
  }

  getAll(): Observable<ToDoItem[]> {
    return this.http.get<ToDoItem[]>(BASE_URL);
  }
}
