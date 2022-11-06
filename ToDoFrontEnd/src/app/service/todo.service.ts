import { Injectable } from '@angular/core';
import { TodoApiService } from '../api/todo.api.service';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _selectedTodoItem: ToDoItem = {} as ToDoItem;
  private _updatingTodoItem: ToDoItem = {} as ToDoItem;
  todoItems: ToDoItem[] = [];
  constructor(private todoStore: TodoStoreService,
              private todoApi: TodoApiService) {
  }

  public load(): void {
    this.todoApi.getAll().subscribe({
      next: response => {
        this.todoItems = response;
      }
    });
  }
  public create(todoItem: ToDoItem): void {
    this.todoApi.create(todoItem).subscribe({
      next: () => {}
    });
  }

  public update(updateTodoItem: ToDoItem): void {
    this.todoApi.update(updateTodoItem).subscribe({
      next: () => {}
    });
  }

  public delete(id: number): void {
    this.todoApi.delete(id).subscribe({
      next: () => {}
    });
  }

  public selectTodoItem(id: number): void {
    this.todoApi.findById(id).subscribe({
      next: response => {
        this._selectedTodoItem = response
      }
    });
  }

  public selectTodoItemForUpdate(id: number): void {
    this.todoApi.findById(id).subscribe({
      next: response => {
        this._updatingTodoItem = response
      }
    });
  }

  public currentTodoItem(): ToDoItem {
    return this._selectedTodoItem;
  }

  public currentUpdatingTodoItem(): ToDoItem {
    return this._updatingTodoItem;
  }
}
