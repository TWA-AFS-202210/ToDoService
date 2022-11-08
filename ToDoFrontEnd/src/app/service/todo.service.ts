import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoApiService } from '../api/todo.api.service';
import { ToDoItem } from '../model/ToDoItem';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoItems: ToDoItem[] = [];
  constructor(private todoApi: TodoApiService) {
  }

  public load(): Observable<ToDoItem[]> {
    return this.todoApi.getAll();
  }

  public create(todoItem: ToDoItem): Observable<ToDoItem> {
    return this.todoApi.create(todoItem);
  }

  public update(updateTodoItem: ToDoItem): Observable<ToDoItem>  {
    return this.todoApi.update(updateTodoItem)
  }

  public delete(id: number): Observable<ToDoItem>  {
    return this.todoApi.delete(id)
  }

  public findById(id: number): Observable<ToDoItem> {
    return this.todoApi.findById(id);
  }
}
