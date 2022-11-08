import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToDoItem } from '../../model/ToDoItem';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-list-todoitem',
  templateUrl: './list-todoitem.component.html',
  styleUrls: ['./list-todoitem.component.scss']
})
export class ListTodoitemComponent implements OnInit {

  todoItems: ToDoItem[] = [];

  constructor(private todoService: TodoService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.todoService.load().subscribe({
      next: response => {
        this.todoItems = response;
      }
    });
  }

  public detail(id: number): void {
    this.router.navigate(['todos', id]);
  }

  public update(id: number): void {
    this.router.navigate(['todos', 'edit', id]);
  }

  public doDelete(id: number): void {
    this.todoService.delete(id).subscribe({
      next: () => {
        this.delete(id);
      }, error: err => {
        console.log(err);
        alert('delete error');
      }
    });
  }

  private delete(id: number): void {
    const index = this.todoItems.findIndex(item => item.id === id);
    if (index >= 0) {
      this.todoItems.splice(index, 1);
    }
  }
}
