import { Injectable } from '@angular/core';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private todoStore: TodoStoreService) {
  }

  public get todoItems(): Array<ToDoItem> {
    return this.todoStore.getAll();
  }

  public create(todoItem: ToDoItem): void {
    this.todoStore.create(todoItem);
  }

  public update(updateTodoItem: ToDoItem): void {
    this.todoStore.update(updateTodoItem);
  }

  public delete(id: number): void {
    this.todoStore.delete(id);
  }

  public findById(id: number): ToDoItem {
    return this.todoStore.findById(id);
  }

}
